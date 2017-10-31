import {gbs} from 'config/settings.js';

module.exports = {
    name: 'article-list',
    data() {
        return {
            article_list: [],
            listLoading: false,
            image_host: gbs.image_host,

            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false

            //需要给分页组件传的信息
            paginations: {
                current_page: 1,
                total: 0,
                page_size: 12,
                page_sizes: [3, 9, 12, 24],
                layout: "total, sizes, prev, pager, next, jumper"
            },

            search_data: {
                title: ''
            },

            //详情弹框信息
            dialog: {
                show: false,
                url: '',
                article_info: {}
            },

            fields: {
                id: {
                    info: {
                        prop: 'id',
                        label: '文章ID',
                        sortable: true
                    },
                    filter: {},
                    style: {
                        width: '150',
                        align: 'center'
                    }
                },
                created_at: {
                    info: {
                        prop: 'created_at',
                        label: '发布日期',
                        sortable: true
                    },
                    filter: {},
                    style: {
                        width: '260',
                        align: 'center'
                    }
                },
                updated_at: {
                    info: {
                        prop: 'created_at',
                        label: '上次修改日期',
                        sortable: true
                    },
                    filter: {},
                    style: {
                        width: '260',
                        align: 'center'
                    }
                },
                title: {
                    info: {
                        prop: 'title',
                        label: '文章标题',
                        sortable: false
                    },
                    filter: {},
                    style: {
                        width: '150',
                        align: 'left'
                    }
                },
                content: {
                    info: {
                        prop: 'content',
                        label: '文章内容',
                        sortable: true
                    },
                    filter: {},
                    style: {
                        width: '150',
                        align: 'center'
                    }
                }
            }
        }
    },
    methods: {

        /**
         * 表格列表触发CheckBox的事件
         * @param  {array} val 当前选中的用户信息数组，每个元素是用户信息对象
         */
        onSelectionChange(val) {
            // console.log(val);
            if (val.length) {
                this.batch_flag = false;
                var ids = [];
                for (var i = 0; i < val.length; i++) {
                    ids.push(val[i].id);
                }
                this.batch_id = ids.join(',');
            } else {
                this.batch_flag = true;
                this.batch_id = '';
            }
        },


        /**
         * 搜索事件
         */
        onSearch() {
            // console.log(this.search_data);
            var query = this.$route.query;
            var sd = {};

            var query = this.$route.query;
            for (var p in query) {
                sd[p] = query[p];
            }

            var where = {};

            for (var s in this.search_data) {
                if (this.search_data[s]) {
                    where[s] = this.search_data[s];
                } else {
                    if (sd[s]) {
                        delete sd[s];
                    }
                }
            }


            this.getList({
                where,
                fn: () => {
                    this.setPath(Object.assign(sd, where));
                }
            });

        },


        /**
         * 改变页码和当前页时需要拼装的路径方法
         * @param {string} field 参数字段名
         * @param {string} value 参数字段值
         */
        setPath(field, value) {
            var path = this.$route.path,
                query = Object.assign({}, this.$route.query);

            if (typeof field === 'object') {
                query = field;
            } else {
                query[field] = value;
            }

            this.$router.push({
                path,
                query
            });
        },

        /**
         * 改变当前页事件
         * @param  {number} page 当前页码
         */
        onChangeCurrentPage(page) {
            this.getList({
                page,
                fn: () => {
                    this.setPath('page', page);
                }
            });
        },

        /**
         * 改变每页显示数量事件
         * @param  {number} size 当前每页显示数量
         */
        onChangePageSize(page_size) {
            this.getList({
                page_size,
                fn: () => {
                    this.setPath('page_size', page_size);
                }
            });
        },


        /**
         * 删除文章事件
         * @param  {object || boolean} article  当前文章信息对象或者为布尔值,为布尔值时，代表是批量删除
         * @param  {number} index 当前文章列表索引
         * @param  {array} list  当前文章列表数组
         */
        onDeleteArticle(article, index, list) {
            // console.dir(user);
            if (article === true) {
                var id = this.batch_id;
            } else {
                var id = article.id;
            }
            var data = {
                httpResourceUrl: '/' + id,
                id: id
            };
            this.$$api_article_deleteArticle(data, (data) => {
                if (article === true) {
                    this.article_list = this.article_list.filter(function (item, idx) {
                        return id.indexOf(item.id) === -1;
                    });
                } else {
                    list.splice(index, 1);
                }
                this.getList();
            });
        },

        /**
         * 修改文章
         * @param  {object} article 当前文章信息对象
         */
        onEditArticle(article) {
            if (article && article.id) {
                this.$router.push('/admin/article/edit?id=' + article.id);
            } else {
                this.$message({
                    showClose: true,
                    message: 'ID跑哪去了？',
                    type: 'error'
                });
            }
        },

        /**
         * 查看文章信息事件
         * @param  {object} article 当前文章信息对象
         */
        onSelectArticle(article) {
            this.dialog.show = true;
            this.dialog.url = article.cover.url;
            this.dialog.article_info = article;
            console.log(article);
        },

        onCloseView() {


        },

        /**
         * 获取文章列表
         * @param  {number} options.page      当前页码，切换页码时用
         * @param  {number} options.page_size 每页显示数量，改变每页数量时用
         * @param  {function} options.fn                            } 获取列表后的回调函数
         */
        getList({
                    page,
                    page_size,
                    where,
                    fn
                } = {}) {

            this.listLoading = true;
            var query = this.$route.query;

            this.paginations.current_page = page || parseInt(query.page) || 1;
            this.paginations.page_size = page_size || parseInt(query.page_size) || this.paginations.page_size;

            var data = {
                page: this.paginations.current_page,
                limit: this.paginations.page_size
            };

            if (where) {
                data = Object.assign(data, where || {});
            } else {
                for (var s in query) {
                    if (this.search_data[s] !== undefined) {
                        this.search_data[s] = query[s];
                        data[s] = query[s];
                    }
                }
            }

            this.$$api_article_selectArticle(data, (article_data) => {
                this.article_list = article_data.list;
                this.paginations.total = Number(article_data.count);
                this.listLoading = false;
                fn && fn();
            });
        },
    },
    mounted() {
        this.getList({
            fn: () => {
                // this.onSelectArticle(this.article_list[1]);
            }
        });
    },
    '$route'(to, from) {

    }
}