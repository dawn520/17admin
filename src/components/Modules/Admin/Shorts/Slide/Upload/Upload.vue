<template>
    <div class="list">
        <el-row>
            <el-col :span="4">
                <el-radio class="radio" v-model="uploadData.type" label="1">app端</el-radio>
                <el-radio class="radio" v-model="uploadData.type" label="2">web端</el-radio>
            </el-col>
            <el-col :span="3">
                <el-row>
                    <el-input v-model="uploadData.sort" placeholder="排序"></el-input>
                </el-row>
            </el-col>
            <el-col :span="17">
            </el-col>
        </el-row>

        <el-row>
            <el-upload
                    class="upload-demo"
                    name="images"
                    :data="uploadData"
                    :headers="headers"
                    :action="url"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList2"
                    list-type="picture">

                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-row>
    </div>
</template>

<script>
    import UploadJs from './Upload.js';
    module.exports = UploadJs;

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
