<template>
    <div class="form">
        <el-form label-width="150px" style="margin:20px;width:90%;min-width:600px;"
                 :model="article_data"
                 :rules="rules"
                 v-loading="formLoading"
                 ref='refArticle'>
            <el-row>
                <el-col :span="6">
                    <el-form-item label="ios：版本" prop='ios_version'>
                        <el-input v-model="article_data.ios.version"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="ios：强制更新">
                        <el-switch v-model="article_data.ios.forcible"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="ios：描述" prop='ios_content'>
                <div id="description_ios" style="height:200px;"></div>
            </el-form-item>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="android：版本" prop='android_version'>
                        <el-input v-model="article_data.android.version"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="android：强制更新">
                        <el-switch v-model="article_data.android.forcible"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="android：描述" prop='android_content'>
                <div id="description_android" style="height:200px;"></div>
            </el-form-item>

            <el-row>
                <el-col :span="6">
                    <el-form-item label="web：版本" prop='web_version'>
                        <el-input v-model="article_data.web.version"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="web：强制更新">
                        <el-switch v-model="article_data.web.forcible"></el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-form-item label="web：描述"  prop='web_content'>
                <div id="description_web" style="height:200px;"></div>
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
