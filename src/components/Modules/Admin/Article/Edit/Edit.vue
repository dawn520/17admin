<template>
    <div class="form">
        <el-form label-width="100px" style="margin:20px;width:90%;min-width:600px;"
                 :model="article_data"
                 :rules="rules"
                 v-loading="formLoading"
                 ref='refArticle'>
            <el-form-item label="文章标题" prop='title' style="width:600px;">
                <el-input v-model="article_data.title"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop='sort' style="width:600px;">
                <el-input v-model="article_data.sort" placeholder="排序"></el-input>
            </el-form-item>
            <el-form-item label="文章内容" style="width:986px;" prop='content'>
                <div id="article" style="height:640px;"></div>
            </el-form-item>
            <el-form-item label="文章标签" prop='tags'>
                <el-input v-model="article_data.tags"></el-input>
                <span>多个用英文逗号隔开</span>
            </el-form-item>
            <el-form-item label="封面">
                <div>
                    <el-upload
                            name="images"
                            :action="url"
                            :data="postData"
                            :headers="headers"
                            list-type="picture-card"
                            :file-list="fileList"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove"
                            :on-success="uploadSuccess"
                            :before-upload="uploadBefore">
                        <i class="el-icon-plus"></i>
                    </el-upload>

                </div>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click='onSubmit("refArticle")'>立即{{article_data.id ? '修改' : '添加'}}
                </el-button>
                <el-button @click='reset_article("article_data")'>重置</el-button>
            </el-form-item>
        </el-form>
        <el-dialog v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    import EditJs from './Edit.js';

    module.exports = EditJs;
</script>
<style scoped>

</style>
