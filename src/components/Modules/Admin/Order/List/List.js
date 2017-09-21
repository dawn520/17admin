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
            batch_id: '', //批量删除时这是多个用逗号隔开的id字符串
            batch_flag: true, //符合批量删除为true,否则为false
            //状态：0：已经提交审核，1：审核中，2：审核不通过，3：审核通过，4：认证被撤销
            statusfulters: [{
                text: '已经提交审核',
                value: 0
            }, {
                text: '审核中',
                value: 1
            }, {
                text: '审核不通过',
                value: 2
            }, {
                text: '审核通过',
                value: 3
            }, {
                text: '认证被撤销',
                value: 4
            }],
            form: {},
            id: 0,
            radio: 0,
            index: '',
            detail: {},
            refuse: {},
            content:''
        }
    },
    methods: {
        filterStatus(value, item) {
            return item.state == value;
        },
        filterType(value, item) {
            return item.type == value;
        },

        showPicture(id) {
            this.listLoading = true;
            this.orderId = id;
            var data = {
                httpResourceUrl: '/' + this.id,
                id: id
            };
            this.$$api_orders_order(data, (data) => {
                this.dialogPictures = true;
                this.listLoading = false;
                switch (data.reason) {
                    case 1:
                        data.reasontext = '买错了';
                        break;
                    case 2:
                        data.reasontext = '计划有变，没时间消费';
                        break;
                    case 3:
                        data.reasontext = '预约不上';
                        break;
                    case 4:
                        data.reasontext = '去过了，不太满意';
                        break;
                    case 5:
                        data.reasontext = '后悔了，不想要了';
                        break;
                    case 999:
                        data.reasontext = '其他';
                        break;
                }
                switch (data.refundRefuse.reason) {
                    case 1:
                        data.refundRefuse.reasontext = '超出服务范围';
                        break;
                    case 2:
                        data.refundRefuse.reasontext = '无有效举证';
                        break;
                    case 3:
                        data.refundRefuse.reasontext = '退款金额无法达成一致';
                        break;
                    case 99:
                        data.refundRefuse.reasontext = '其他';
                        break;
                }
                this.detail = data;
                this.refuse = data.refundRefuse;
            });
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
            this.$$api_orders_orderList(data, (data) => {
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
         * 发送编辑请求
         */
        judge(type) {
            this.$confirm('你确定提交判定吗？', '提交', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                var data = {
                    httpResourceUrl: '/' +  this.detail.id,
                    id: this.detail.id,
                    type: type,
                    content:this.content
                };
                this.$$api_orders_orderCheck(data, () => {
                    if (data.status == 200) {
                        this.$message.success('判定成功！');
                        this.getList();
                    }
                    this.dialogPictures = false;
                    this.content = '';
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
        '$route'(to, from) {
            this.getList();
            console.log('sassd');
        }
    }
}