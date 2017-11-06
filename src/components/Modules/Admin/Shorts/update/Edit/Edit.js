import {gbs} from 'config/settings.js';

module.exports = {
    name: 'setting-update',
    data() {
        return {
            url: gbs.host + '/image',
            postData: {
                type: '14'
            },

            formLoading: false,
            fileList: [],
            headers: {
                Authorization: this.$store.state.user.userinfo.token_type + ' ' + this.$store.state.user.userinfo.token
            },


            article_data: {
                ios: {
                    version: "1.0.0",
                    forcible: true,
                    description: ""
                },
                android: {
                    version: "1.0.0",
                    forcible: true,
                    description: ""
                },
                web: {
                    version: "1.0.0",
                    forcible: true,
                    description: ""
                }
            },
            temp: {
                ios: {
                    description: ""
                },
                android: {
                    description: ""
                },
                web: {
                    description: ""
                }
            },
            rules: {
                ios_version: [{
                    required: true,
                    message: '文章标题不能为空！',
                    trigger: 'blur'
                }]
            },
            wangEditor: {
                bar: [
                    'source', '|',
                    'bold', 'underline', 'italic', 'strikethrough', 'eraser', 'forecolor', 'bgcolor', '|',
                    'quote', 'fontfamily', 'fontsize', 'head', 'unorderlist', 'orderlist', 'alignleft', 'aligncenter', 'alignright', '|',
                    'link', 'unlink', 'table', 'emotion', '|',
                    // 'img',
                    // 'video',
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
            if (this.article_data.ios.version.length == 0) {
                this.$message('请填写ios版本号！');
                return false;
            }
            if (this.article_data.android.version.length == 0) {
                this.$message('请填写android版本号！');
                return false;
            }
            if (this.article_data.web.version.length == 0) {
                this.$message('请填写web版本号！');
                return false;
            }
            var postData = this.article_data;
            if (this.article_data.ios.forcible == true) {
                postData.ios.forcible = 1;
            } else {
                postData.ios.forcible = 0;
            }
            if (this.article_data.android.forcible == true) {
                postData.android.forcible = 1;
            } else {
                postData.android.forcible = 0;
            }
            if (this.article_data.web.forcible == true) {
                postData.web.forcible = 1;
            } else {
                postData.web.forcible = 0;
            }
            this.formLoading = true;
            this.$$api_shorts_updateUpgrade(postData, data => {
                this.$message({
                    message: '保存成功！',
                    type: 'success'
                });
                this.formLoading = false;
                if (this.article_data.ios.forcible == 1) {
                    this.article_data.ios.forcible = true;
                } else {
                    this.article_data.ios.forcible = false;
                }
                if (this.article_data.android.forcible == true) {
                    this.article_data.android.forcible = true;
                } else {
                    this.article_data.android.forcible = false;
                }
                if (this.article_data.web.forcible == true) {
                    this.article_data.web.forcible = true;
                } else {
                    postData.web.forcible = false;
                }
            });
        },
        setContent(html, text) {
            this.article_data.ios.description = html;
            this.temp.ios.description = text;
        },
        setContent2(html, text) {
            this.article_data.android.description = html;
            this.temp.android.description = text;
        },
        setContent3(html, text) {
            this.article_data.web.description = html;
            this.temp.web.description = text;
        },
        reset_article(article) {
            this.$refs[article].resetFields();
        },
    },

    mounted() {
        var self = this;
        var editor = new wangEditor('description_ios');
        var editor2 = new wangEditor('description_android');
        var editor3 = new wangEditor('description_web');

        this.formLoading = true;

        editor.config.uploadImgFileName = 'images';

        editor.config.uploadImgUrl = this.url;

        // 配置自定义参数（举例）
        editor.config.uploadParams = {
            type: 14,
        };
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

        editor2.config = editor3.config = editor.config;


        //编辑器改变事件时，同步更新文章内容
        editor.onchange = function () {
            var text = this.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
                html = this.$txt.html();
            self.setContent(html, text);
        };
        //编辑器改变事件时，同步更新文章内容
        editor2.onchange = function () {
            var text = this.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
                html = this.$txt.html();
            self.setContent2(html, text);
        };
        //编辑器改变事件时，同步更新文章内容
        editor3.onchange = function () {
            var text = this.$txt.text().replace(/(^\s*)|(\s*$)/g, ""),
                html = this.$txt.html();
            self.setContent3(html, text);
        };

        // editor.config.hideLinkImg = true;

        //自定义上传图片错误事件
        editor.create();
        editor2.create();
        editor3.create();
        $("#description_ios").height(200);
        $("#description_android").height(200);
        $("#description_web").height(200);

        var data = {
            httpResourceUrl: '',
            id: ''
        };
        this.$$api_shorts_getUpgrade(data, (data) => {
            // console.log(data);
            this.article_data = data;
            this.temp.ios.description = this.article_data.ios.description;
            this.temp.android.description = this.article_data.android.description;
            this.temp.web.description = this.article_data.web.description;

            if (this.article_data.ios.forcible == 1) {
                this.article_data.ios.forcible = true;
            } else {
                this.article_data.ios.forcible = false;
            }
            if (this.article_data.android.forcible == true) {
                this.article_data.android.forcible = true;
            } else {
                this.article_data.android.forcible = false;
            }
            if (this.article_data.web.forcible == true) {
                this.article_data.web.forcible = true;
            } else {
                postData.web.forcible = false;
            }

            $("#description_ios").html(this.article_data.ios.description);
            $("#description_android").html(this.article_data.android.description);
            $("#description_web").html(this.article_data.web.description);
            this.formLoading = false;
        });
    }
}