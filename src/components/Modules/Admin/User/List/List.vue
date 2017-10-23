<template>
    <div class="list">
        <el-col :span="24" class='actions-top'>
            <el-button type='danger' icon='delete'
                       :disabled='batch_flag'
                       @click='onDeleteUser(true)'>删除选中
            </el-button>

            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="姓名"
                              v-model='search_data.username'
                              clear></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="邮箱" v-model='search_data.email'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click='onSearch'>查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table border style="width: 100%" align='center'
                  :data="user_list"
                  v-loading.body="listLoading"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="用户ID"
                    align="center"
                    width="150"
                    :sortable="true">
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名"
                    align="center"
                    :sortable="true">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号"
                    align="center"
                    width="130"
                    sortable="true">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="实名"
                    align="center"
                    sortable="true">
            </el-table-column>
            <el-table-column
                    prop="id_card"
                    label="身份证"
                    align="center"
                    :sortable="true">
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="创建时间"
                    align="center"
                    width="180"
                    :sortable="true">
            </el-table-column>
            <el-table-column
                    prop="source"
                    label="渠道来源"
                    align="center"
                    width="180"
                    :sortable="true">
            </el-table-column>

            <el-table-column
                    label="操作"
                    :width="$store.state.user.userinfo.pid==0 ? 280 : 260"
                    :context="_self">
                <!--
                <template scope='scope'>
                    <el-button
                            type="info"
                            icon='view'
                            size="mini"
                            @click='onSelectUser(scope.row)'></el-button>
                    <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='onEditUser(scope.row)'></el-button>

                    <el-button
                            type="primary"
                            size="mini"
                            @click='onSetAccess(scope.row,scope.$index,user_list)'>设置权限
                    </el-button>


                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDeleteUser(scope.row,scope.$index,user_list)'></el-button>


                </template>
                -->
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-col :span="24" class="toolbar">
            <el-pagination
                    layout="prev, pager, next"
                    @current-change="handleCurrentChange"
                    :page-size="limit"
                    :total="slide_count"
                    style="float:right;">
            </el-pagination>
        </el-col>
        <el-tag
                v-for="tag in tags"
                :key="tag.source"
                type="success">
            {{tag.source}}:{{tag.number}}
        </el-tag>

        <el-dialog title="用户信息" v-model="dialog.show" size="tiny">
            <el-form style="margin:20px;width:60%;min-width:100%"
                     label-width="100px"
                     :model="dialog.user_info">
                <el-form-item class='edit-form'
                              label="邮箱"
                              prop='email'>
                    {{dialog.user_info.email}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="用户名称"
                              prop='username'>
                    {{dialog.user_info.username}}
                </el-form-item>
                <el-form-item label="性别">
                    {{dialog.user_info.sex==1 ? '男' : (dialog.user_info.sex==2 ? '女' : '未知')}}
                </el-form-item>
                <el-form-item label="生日">
                    {{dialog.user_info.birthday}}
                </el-form-item>
                <el-form-item class="edit-form"
                              label='地址'>
                    {{dialog.user_info.address}}
                </el-form-item>
                <el-form-item label="状态">
                    {{dialog.user_info.status==1 ? '启用' : '禁用'}}
                </el-form-item>
                <el-form-item label="创建时间">
                    {{dialog.user_info.create_time}}
                </el-form-item>
                <el-form-item label="最后更新时间">
                    {{dialog.user_info.update_time}}
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="dialog.show = false">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="设置权限" v-model="dialog_access.show" size="small">
            <el-form style="margin:20px;width:60%;min-width:100%"
                     label-width="100px"
                     :model="dialog_access.userinfo">
                <el-form-item class='edit-form'
                              label="邮箱"
                              prop='email'>
                    {{dialog_access.userinfo.email}}
                </el-form-item>
                <el-form-item class='edit-form'
                              label="用户名称"
                              prop='username'>
                    {{dialog_access.userinfo.username}}
                </el-form-item>

                <el-form-item class='edit-form'
                              label="前端页面">
                    <!-- CheckBox选项列表 -->
                    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选
                    </el-checkbox>
                    <div style="margin: 15px 0;"></div>
                    <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>

                <el-form-item class='edit-form'>
                    <el-tree
                            class="filter-tree"
                            show-checkbox
                            default-expand-all
                            node-key="path"
                            :data="accesss"
                            :props="defaultProps"
                            :filter-node-method="filterNode"
                            @check-change='checkChange'
                            @current-change='currentChange'
                            @node-click='nodeClick'
                            ref="accesss">
                    </el-tree>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialog_access.show = false">取 消</el-button>
                <el-button type="primary" @click="dialog_access.show = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
	import ListJs from './List.js';
	module.exports = ListJs;
</script>
<style scoped lang='less'>
    .demo-form-inline {
        display: inline-block;
        float: right;
    }

    .btm-action {
        margin-top: 20px;
        text-align: center;
    }

    .actions-top {
        height: 46px;
    }

    .pagination {
        display: inline-block;
    }
</style>
