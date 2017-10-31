<template>
    <div class="list">
        <el-col :span="24" class='actions-top'>
            <el-button type='danger' icon='delete'
                       :disabled='batch_flag'
                       @click='onDeleteArticle(true)'>删除选中
            </el-button>

            <el-form :inline="true" :model='search_data' class="demo-form-inline">
                <el-form-item>
                    <el-input placeholder="标题" v-model='search_data.title'></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click='onSearch'>查询</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table border style="width: 100%" align='center'
                  :data="article_list"
                  v-loading.body="listLoading"
                  @selection-change='onSelectionChange'>
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    :prop="fields.id.info.prop"
                    :label="fields.id.info.label"
                    :align="fields.id.style.align"
                    :sortable="fields.id.info.sortable"
                    :width="fields.id.style.width">
            </el-table-column>
            <el-table-column
                    :prop="fields.title.info.prop"
                    :label="fields.title.info.label"
                    :align="fields.title.style.align"
                    :sortable="fields.title.info.sortable">
            </el-table-column>
            <el-table-column
                    :prop="fields.created_at.info.prop"
                    :label="fields.created_at.info.label"
                    :align="fields.created_at.style.align"
                    :width="fields.created_at.style.width"
                    :sortable="fields.created_at.info.sortable">
            </el-table-column>
            <el-table-column
                    :prop="fields.updated_at.info.prop"
                    :label="fields.updated_at.info.label"
                    :align="fields.updated_at.style.align"
                    :width="fields.updated_at.style.width"
                    :sortable="fields.updated_at.info.sortable">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="160"
                    :context="_self">
                <template scope='scope'>
                    <el-button
                            type="info"
                            icon='view'
                            size="mini"
                            @click='onSelectArticle(scope.row)'></el-button>
                    <el-button
                            type="info"
                            icon='edit'
                            size="mini"
                            @click='onEditArticle(scope.row)'></el-button>
                    <el-button
                            type="danger"
                            icon='delete'
                            size="mini"
                            @click='onDeleteArticle(scope.row,scope.$index,article_list)'></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-col :span="24" class='btm-action'>
            <el-pagination
                    v-if='paginations.total>0'
                    class='pagination'
                    :page-sizes="paginations.page_sizes"
                    :page-size="paginations.page_size"
                    :layout="paginations.layout"
                    :total="paginations.total"
                    :current-page='paginations.current_page'
                    @current-change='onChangeCurrentPage'
                    @size-change='onChangePageSize'>
            </el-pagination>
        </el-col>
        <el-dialog size="small"
                   :title="dialog.article_info.title"
                   v-model="dialog.show"
                   @close='onCloseView'>
            <div><img :src="image_host +'/'+dialog.url" width="320"></div>
            <div v-html="dialog.article_info.content"></div>
            <!--  <span slot="footer" class="dialog-footer">
                <el-button @click="dialog.show = false">取 消</el-button>
                <el-button type="primary" @click="dialog.show = false">确 定</el-button>
            </span> -->
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
