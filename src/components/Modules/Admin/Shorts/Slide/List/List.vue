<template>
    <div class="list">
        <el-col :span="24" class='actions-top'>
            <el-button type='danger' icon='delete'
                       :disabled='batch_flag'
                       @click='deleteSlide(true)'>删除选中
            </el-button>
        </el-col>
        <el-table border style="width: 100%" align='center'
                  :data="slide_list"
                  v-loading.body="listLoading"
                  @selection-change='onSelectionChange'>

            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="id"
                    align="center"
                    width="150"
                    :sortable="false">
            </el-table-column>
            <el-table-column
                    prop="save_path"
                    label="图片"
                    align="center"
                    :sortable="false">
                <template scope="scope">
                    <el-button @click="showPicture(scope.row.save_path)" type="text"
                               size="small">
                        <img :src="image_host +'/'+ scope.row.save_path+'?imageView2/1/w/45/h/45/q/75|imageslim'">
                    </el-button>
                </template>
            </el-table-column>
            <el-table-column
                    prop="sort"
                    label="排序"
                    align="center"
                    :sortable="false">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="类型"
                    align="center"
                    :sortable="false">
                <template scope="scope">
                    {{scope.row.type == 1 ? 'web' : 'pc'}}
                </template>
            </el-table-column>
            <el-table-column
                    prop="created_at"
                    label="创建时间"
                    align="center"
                    width="180"
                    :sortable="true">
            </el-table-column>

            <el-table-column
                    label="操作"
                    :width="260"
                    :context="_self">
                <template scope='scope'>
                    <el-button
                            type="info"
                            icon='view'
                            size="mini"
                            @click='showPicture(scope.row.save_path)'></el-button>
                    <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='editSlideShow(scope)'></el-button>
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='deleteSlide(false,scope)'></el-button>
                </template>
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
        <!-- 图片弹出框 -->
        <el-dialog title="图片" v-model="dialogPictures">
            <img :src="picture" width="100%">
        </el-dialog>
        <!-- 编辑排序框 -->
        <el-dialog title="编辑" v-model="dialogEdit" size="tiny">
            <el-form :model="form">
                <el-form-item label="排序">
                    <el-input v-model="form.sort"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogEdit = false">取 消</el-button>
                <el-button type="primary" @click="editSlide">确 定</el-button>
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
