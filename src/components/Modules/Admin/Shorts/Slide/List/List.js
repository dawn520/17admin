import {gbs} from 'config/settings.js';
module.exports = {
    name: 'list',
    data() {
        return {
            limit: 10,
            page: 1,
            slide_list: [], //用户列表数组
            slide_count: 0, //用户列表数组
            listLoading: false,  //加载进度
            dialogPictures: false, //图片弹出框
            image_host: gbs.image_host,
            picture: '',
            isIndeterminate: true,
            dialogEdit: false,//编辑框
            form: {
                id: '',
                sort: '',
                index: ''
            },
            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false


            //详情弹框信息
            dialog: {
                show: false,
                user_info: {}
            },

            dialog_access: {
                show: false,
                userinfo: {},
                web_routers: [],
                api_routers: []
            },


            accesss: [],
            checkeds: [],
            defaultProps: {
                children: 'children',
                label: 'name'
            }

        }
    },
    methods: {
        showPicture: function (save_path) {
            this.picture = '';
            this.picture = this.image_host + '/' + save_path;
            this.dialogPictures = true;
        },
        handleCheckAllChange(event) {
            this.checkedCities = event.target.checked ? this.cities : [];
            this.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {
            let checkedCount = value.length;
            this.checkAll = checkedCount === this.cities.length;
            this.isIndeterminate = checkedCou
            nt > 0 && checkedCount < this.cities.length;
        },

        filterNode(value, data) {
            if (!value) return true;
            return data.label.indexOf(value) !== -1;
        },

        currentChange(data, node) {
            // console.log(data, node);
        },

        nodeClick(data, node, self) {
            // console.log(node);
        },

        checkChange(data, selfIsChecked, childHasChecked) {
            if (selfIsChecked === true && data.access.split('/').length == 4 && this.checkeds.indexOf(data.access) === -1) {
                this.checkeds.push(data.access);
            } else {
                var index = this.checkeds.indexOf(data.access);
                if (index !== -1) {
                    this.checkeds.splice(index, 1);
                }
            }
        },


        initRouters(){
            var routes = this.$router.options.routes;
            for (var i = 0; i < routes.length; i++) {
                if (routes[i].hidden !== true && routes[i].children && routes[i].children.length) {
                    var tempObj = {},
                        module = routes[i],
                        menus = module.children;
                    tempObj.name = module.name;
                    tempObj.path = module.path;
                    tempObj.access = module.path;
                    tempObj.children = [];
                    for (var j = 0; j < menus.length; j++) {
                        if (menus[j].hidden !== true && menus[j].children && menus[j].children.length) {
                            var tempChildObj = {},
                                menu = menus[j],
                                pages = menu.children;
                            tempChildObj.name = menu.name;
                            tempChildObj.path = '/' + menu.path;
                            tempChildObj.access = tempObj.path + '/' + menu.path;
                            tempChildObj.children = [];
                            for (var k = 0; k < pages.length; k++) {
                                if (pages[k].hidden !== true) {
                                    var tempPageObj = {},
                                        page = pages[k];
                                    tempPageObj.name = page.name;
                                    tempPageObj.path = '/' + page.path;
                                    tempPageObj.access = tempObj.path + '/' + menu.path + '/' + page.path;
                                    tempChildObj.children.push(tempPageObj);
                                }
                            }
                            tempObj.children.push(tempChildObj);
                        }
                    }
                    this.accesss.push(tempObj);
                }
            }
        },


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
         * 改变页码和当前页时需要拼装的路径方法
         * @param {string} field 参数字段名
         * @param {string} value 参数字段值
         */
        setPath(field, value) {
            var path = this.$route.path,
                query = Object.assign({}, this.$route.query);

            query[field] = value;

            this.$router.push({
                path: path,
                query: query
            });
        },


        /**
         * 改变当前页事件
         * @param  {number} page 当前页码
         */
        onChangeCurrentPage(page) {
            this.setPath('page', page);
        },


        /**
         * 改变每页显示数量事件
         * @param  {number} size 当前每页显示数量
         */
        onChangePageSize(size) {
            this.setPath('page_size', size);
        },


        /**
         * 获取列表
         */
        getList() {
            var data = {
                limit: this.limit,
                page: this.page,
            };
            this.listLoading = true;
            this.$$api_shorts_slidesList(data, (data) => {
                this.slide_list = data.list;
                this.slide_count = Number(data.count);
                console.log(this.slide_count);
                this.listLoading = false;
            });
        },
        /**
         * 分页显示当前页
         *
         * @param val
         */
        handleCurrentChange(val) {
            this.page = val;
            this.getList();
            this.onChangeCurrentPage(val);
        },
        /**
         *显示编辑dialog
         */
        editSlideShow(scope){
            var row = scope.row;
            this.dialogEdit = true;
            this.form.id = row.id;
            this.form.sort = row.sort;
            this.form.index = scope.$index;
        },
        /**
         * 发送编辑请求
         */
        editSlide(){
            this.dialogEdit = false;
            this.slide_list[this.form.index].sort = this.form.sort;
            var data = {
                httpResourceUrl: '/' + this.form.id,
                id: this.form.id,
                sort: this.form.sort,
            };

            this.$$api_shorts_editSlides(data, () => {
                this.$message.success('修改成功！');
            });
        },
        deleteSlide(many,scope){
            let id;
            if (many === true) {
                id = this.batch_id;
            } else {
                id = scope.row.id;
            }
            let that = this;
            this.$confirm('你确定删除此图片？', '删除轮播图', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var data = {
                    httpResourceUrl: '/' + id,
                    id: id
                };
                that.$$api_shorts_deleteSlides(data, (data) => {
                    if (many === true) {
                        that.slide_list = that.slide_list.filter(function (item, idx) {
                            return id.indexOf(item.id) === -1;
                        });
                    } else {
                        that.slide_list.splice(scope.$index, 1);
                    }

                    //this.getList();
                });
            });
        }
    },

    mounted() {
        this.getList();
       // this.initRouters();

        //test dialog

        /* setTimeout(() => {
         this.onSelectUser(this.user_list[0]);
         }, 600);*/
    },
    watch: {
        '$route' (to, from) {
            this.getList();
            console.log('sassd');
        }
    }
}