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
            //状态：0：已经提交审核，1：审核中，2：审核不通过，3：审核通过，4：已提现
            statusfulters: [{
                text: '已经提交审核',
                value: 0
            },  {
                text: '审核不通过',
                value: 1
            }, {
                text: '审核通过',
                value: 2
            }, {
                text: '已提现',
                value: 3
            }],
            form:{},
            id:0,
            radio:0,
            index:'',


        }
    },
    methods: {
        filterStatus(value, item){
            return item.state == value;
        },
        filterType(value, item){
            return item.type == value;
        },
        showPicture(save_path) {
            this.picture = '';
            this.picture = this.image_host + '/' + save_path;
            this.dialogPictures = true;
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
            this.$$api_withdrawals_withdrawalsList(data, (data) => {
                for (var i = 0; i < data.list.length; i++) {
                    //状态：0：已经提交审核，1：审核中，2：审核不通过，3：审核通过，4：已提现
                    switch (data.list[i].state) {
                        case 0:
                            data.list[i].stateText = '已经提交审核';
                            break;
                        case  1 :
                            data.list[i].stateText = '审核不通过';
                            break;
                        case  2 :
                            data.list[i].stateText = '审核通过';
                            break;
                        case  3 :
                            data.list[i].stateText = '已提现';
                            break;
                        default:
                            data.list[i].stateText = '状态错误';
                    }
                }
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
         *显示审核dialog
         */
        checkDialog(scope){
            var row = scope.row;
            this.dialogEdit = true;
            this.id = row.id;
            this.radio = row.state;
            this.index = scope.$index;
        },
        /**
         * 发送编辑请求
         */
        edit(){
            this.dialogEdit = false;
            this.slide_list[this.index].state = this.radio;
            switch (this.radio) {
                case 0:
                    this.slide_list[this.index].stateText = '已经提交审核';
                    break;
                case  1 :
                    this.slide_list[this.index].stateText = '审核不通过';
                    break;
                case  2 :
                    this.slide_list[this.index].stateText = '审核通过';
                    break;
                case  3 :
                    this.slide_list[this.index].stateText = '已提现';
                    break;
                default:
                    this.slide_list[this.index].stateText = '状态错误';
            }
            var data = {
                httpResourceUrl: '/' + this.id,
                id: this.id,
                state: this.radio,
            };
            this.$$api_withdrawals_withdrawalsEdit(data, () => {
                this.$message.success('修改成功！');
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