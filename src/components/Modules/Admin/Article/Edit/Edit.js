import {gbs} from 'config/settings.js';

module.exports = {
    name: 'edit-article',
    data() {
        return {
            url: gbs.host + '/image',
            postData: {
                type: '14'
            },
            dialogImageUrl: '',
            dialogVisible: false,
            formLoading: false,
            fileList: [],
            headers: {
                Authorization: this.$store.state.user.userinfo.token_type + ' ' + this.$store.state.user.userinfo.token
            },


            article_data: {
                title: '',
                cate: '',
                tags: '',
                cover: 0,
                content: '',
            },
            temp: {
                content: ''
            },
            rules: {
                title: [{
                    required: true,
                    message: '文章标题不能为空！',
                    trigger: 'blur'
                }],
                tags: [{
                    required: true,
                    message: '请至少添加一个文章标签！',
                    trigger: 'change'
                }],
                content: [{
                    required: true,
                    message: '文章不能为空！',
                    trigger: 'blur'
                }],
                cover: [{
                    min: 1,
                    required: true,
                    message: '封面不能为空！',
                    trigger: 'blur'
                }]
            },
            wangEditor: {
                bar: [
                    'source', '|',
                    'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|',
                    'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|',
                    'link', 'unlink', 'table', 'emotion', '|',
                    'img',
                    'video',
                    // 'location',
                    'insertcode', '|',
                    'undo', 'redo', 'fullscreen'
                ]
            }
        }
    },

    methods: {
        /**
         * 提交表单
         * @param  {string} formName 表单名称
         */
        onSubmit(formName) {

            if (this.article_data.cover == 0) {
                this.$message('请选择封面图片！');
                return false;
            }

            var ref = this.$refs[formName];
            ref.validate((valid) => {
                if (valid) {
                    // console.log(this.article_data.content);
                    // console.log(this.temp.content);

                    // return;


                    if (!this.temp.content) {
                        if ((this.article_data.content.indexOf('<iframe') == -1 || this.article_data.content.indexOf('</iframe>') == -1) && (this.article_data.content.indexOf('<img') == -1)) {
                            this.$message.error('文章内容不能为空！');
                            return;
                        }
                        return;
                    }
                    this.$$api_article_articles(this.article_data, data => {
                        this.$router.push('/admin/article/list');
                    });
                }
            });
        },
        setContent(html, text) {
            this.article_data.content = html;
            this.temp.content = text;
        },
        reset_article(article) {
            this.$refs[article].resetFields();
        },

        handleRemove(file, fileList) {
            console.log(file, fileList);
            this.article_data.cover = 0;
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        uploadSuccess(response, file, fileList) {
            this.article_data.cover = response.data.id;
        },
        uploadBefore(file) {
            if (this.article_data.cover != 0) {
                this.$message('封面只能传一张！');
                return false;
            }
        }
    },

    mounted() {
        var self = this;
        var editor = new wangEditor('article');
        this.formLoading = true;

         console.log(editor.config);

        // editor.config.jsFilter = false;

        editor.config.uploadImgFileName = 'images';

        editor.config.uploadImgUrl = this.url;

        // 配置自定义参数（举例）
        editor.config.uploadParams = {
            type: 14,
        };
        console.log(this.headers);
        editor.config.uploadHeaders = this.headers;

        // 自定义load事件
        editor.config.uploadImgFns.onload = (data) => {
            if (data.status === 200) {
                // 上传图片时，已经将图片的名字存在 editor.uploadImgOriginalName
                var originalName = editor.uploadImgOriginalName || '';

                // 如果 resultText 是图片的url地址，可以这样插入图片：
                editor.command(null, 'insertHtml',
                    '<img src="'
                    + gbs.image_host
                    + '/'
                    + data.data.dirname
                    + '/'
                    + data.data.basename
                    + '" alt="' + originalName + '" style="max-width:100%;"/>');
            } else {
                if (data.status === 404) {
                    this.$message.error('上传错误信息：token无效！');
                } else {
                    this.$message.error('上传错误信息：' + data.msg);
                }
            }

        };

        editor.config.uploadImgFns.onerror = (xhr) => {
            this.$message.error('上传错误信息：网络错误！');
        };

        editor.config.menus = this.wangEditor.bar;

        //编辑器改变事件时，同步更新文章内容
        editor.onchange = function () {

            var text = this.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
                html = this.$txt.html();

            /*console.log(text);
             console.log(html);*/

            self.setContent(html, text);
        };

        // editor.config.hideLinkImg = true;

        //自定义上传图片错误事件
        editor.create();
        $("#article").height(540);
        if (this.$route.query.id) {
            var data = {
                httpResourceUrl: '/' + this.$route.query.id,
                id: this.$route.query.id
            };
            this.$$api_article_findArticle(data, (data) => {
                // console.log(data);
                this.fileList = [{
                    name: data.cover.url,
                    url: gbs.image_host + '/' + data.cover.url
                },];
                this.article_data = data;
                this.article_data.cover = data.cover.id;
                this.temp.content = this.article_data.content;
                $("#article").html(this.article_data.content);
                this.formLoading = false;
            });
        } else {
            this.formLoading = false;
        }
    }
}