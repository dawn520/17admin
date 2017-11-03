import {gbs} from 'config/settings.js';

module.exports = {
    name: 'upload',
    data() {
        return {
            url: gbs.host + '/image',
            headers: {
                Authorization: this.$store.state.user.userinfo.token_type + ' ' + this.$store.state.user.userinfo.token
            },
            uploadData: {
                type: '99',
            },
            fileList: [],
        }
    },
    methods: {
        handleRemove: function (file, fileList) {
            console.log(file, fileList);
        },
        handlePreview: function (file) {
            console.log(file);
        },
        handleSuccess: function (response, file, fileList) {
            if (response.status == 200) {
                this.$message({
                    message: '上传成功！',
                    type: 'success'
                });
                fileList[fileList.length - 1].name = gbs.image_host + '/' + response.data.dirname + '/' + response.data.basename;
            } else {
                fileList.pop();
                this.$message({
                    message: '上传失败！',
                    type: 'warning'
                });
            }
        }
    },

    mounted() {

    },
    watch: {}
}