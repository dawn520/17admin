import {gbs} from 'config/settings.js';
module.exports = {
    name: 'upload',
    data() {
        return {
            url:gbs.host+'/slides',
            headers:{
                Authorization : this.$store.state.user.userinfo.token_type + ' ' + this.$store.state.user.userinfo.token
            },
            uploadData:{
                type:'1',
                sort:99
            },
            fileList2: [],
        }
    },
    methods: {
        handleRemove:function(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview:function(file) {
            console.log(file);
        }
    },

    mounted() {

    },
    watch: {
    }
}