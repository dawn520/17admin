webpackJsonp([1,12],{301:function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=r(337),a=o(i);e.exports=a.default},337:function(e,t,r){"use strict";var o=r(22);e.exports={name:"login",data:function(){var e=this;return{winSize:{width:"",height:""},formOffset:{position:"absolute",left:"",top:""},remumber:this.$store.state.user.remumber,register:!1,login_actions:{disabled:!1},data:{username:"",password:"",grant_type:o.gbs.grant_type,client_id:o.gbs.client_id,client_secret:o.gbs.client_secret},rule_data:{username:[{validator:function(e,t,r){""===t?r(new Error("请输入用户名")):/^[a-zA-Z0-9_-]{1,16}$/.test(t)?r():r(new Error("用户名至少6位,由大小写字母和数字,-,_组成"))},trigger:"blur"}],password:[{validator:function(t,r,o){""===r?o(new Error("请输入密码")):/^[a-zA-Z0-9_-]{6,16}$/.test(r)?(e.register===!0&&""!==e.data.repassword&&e.$refs.data.validateField("repassword"),o()):o(new Error("密码至少6位,由大小写字母和数字,-,_组成"))},trigger:"blur"}],repassword:[{validator:function(t,r,o){""===r?o(new Error("请再次输入密码")):r!==e.data.password?o(new Error("两次输入密码不一致!")):o()},trigger:"blur"}]}}},methods:{setSize:function(){this.winSize.width=$(window).width()+"px",this.winSize.height=$(window).height()+"px",this.formOffset.left=parseInt(this.winSize.width)/2-175+"px",this.formOffset.top=parseInt(this.winSize.height)/2-178+"px"},onLogin:function(e,t){var r=this;return t&&this.register===!0?void this.$message.error("请输入确认密码"):void this.$refs[e].validate(function(t){t&&(r.login_actions.disabled=!0,r.$$api_user_login(r[e],function(t){r.remumber.remumber_flag===!0?r.$store.dispatch("update_remumber",{remumber_flag:r.remumber.remumber_flag,remumber_login_info:{username:r[e].username,token:t.userinfo.token_type+t.userinfo.access_token}}):r.$store.dispatch("remove_remumber"),r.$store.dispatch("update_userinfo",{userinfo:t.userinfo}).then(function(){r.login_actions.disabled=!1,r.$router.push("/admin/shorts/slide")})},{errFn:function(){r.login_actions.disabled=!1},tokenFlag:!0}))})},onRegister:function(e){var t=this;this.$refs[e].validate(function(r){r&&(t.login_actions.disabled=!0,t.$$api_user_register(t[e],function(e){t.login_actions.disabled=!1,t.$message.success("注册成功，请登录。"),t.toggleStatus(!1)},{errFn:function(){t.login_actions.disabled=!1},tokenFlag:!0}))})},resetForm:function(e){this.$refs[e].resetFields()},toggleStatus:function(e){this.register=e,this.register===!0?this.$set(this.data,"repassword",""):this.$delete(this.data,"repassword")}},created:function(){var e=this;this.setSize(),$(window).resize(function(){e.setSize()})},mounted:function(){this.remumber.remumber_flag===!0&&(this.data.username=this.remumber.remumber_login_info.username,this.data.password=this.remumber.remumber_login_info.token.substring(0,16),this.$set(this.data,"token",this.remumber.remumber_login_info.token))}}},338:function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}var i=r(794),a=o(i);e.exports=a.default},489:function(e,t,r){t=e.exports=r(10)(),t.push([e.id,".login[data-v-ebfb3cee]{background:#1f2d3d}.login .card-box[data-v-ebfb3cee]{box-shadow:0 0 8px 0 rgba(0,0,0,.06),0 1px 0 0 rgba(0,0,0,.02);border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin-bottom:20px;background-color:#f9fafc;border:2px solid #8492a6}.login .title[data-v-ebfb3cee]{margin:0 auto 40px;text-align:center;color:#505458;font-weight:400;font-size:16px}.login .title span[data-v-ebfb3cee]{cursor:pointer}.login .title span.active[data-v-ebfb3cee]{font-weight:700;font-size:18px}.login .loginform[data-v-ebfb3cee]{width:350px;padding:35px 35px 15px}","",{version:3,sources:["/./src/components/Login/Login.vue"],names:[],mappings:"AACA,wBAAwB,kBAAkB,CACzC,AACD,kCAAkC,+DAAiE,kBAAkB,uBAAuB,4BAA4B,mBAAmB,yBAAyB,wBAAwB,CAC3O,AACD,+BAA+B,mBAAwB,kBAAkB,cAAc,gBAAmB,cAAc,CACvH,AACD,oCAAoC,cAAc,CACjD,AACD,2CAA2C,gBAAiB,cAAc,CACzE,AACD,mCAAmC,YAAY,sBAA2B,CACzE",file:"Login.vue",sourcesContent:["\n.login[data-v-ebfb3cee]{background:#1F2D3D\n}\n.login .card-box[data-v-ebfb3cee]{box-shadow:0 0 8px 0 rgba(0,0,0,0.06),0 1px 0 0 rgba(0,0,0,0.02);border-radius:5px;-moz-border-radius:5px;background-clip:padding-box;margin-bottom:20px;background-color:#F9FAFC;border:2px solid #8492A6\n}\n.login .title[data-v-ebfb3cee]{margin:0 auto 40px auto;text-align:center;color:#505458;font-weight:normal;font-size:16px\n}\n.login .title span[data-v-ebfb3cee]{cursor:pointer\n}\n.login .title span.active[data-v-ebfb3cee]{font-weight:bold;font-size:18px\n}\n.login .loginform[data-v-ebfb3cee]{width:350px;padding:35px 35px 15px 35px\n}"],sourceRoot:"webpack://"}])},779:function(e,t,r){var o=r(489);"string"==typeof o&&(o=[[e.id,o,""]]);r(11)(o,{});o.locals&&(e.exports=o.locals)},794:function(e,t,r){r(779);var o=r(6)(r(301),r(833),"data-v-ebfb3cee",null);e.exports=o.exports},833:function(e,t){e.exports={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login",style:e.winSize},[r("el-row",[r("el-col",{attrs:{span:24}},[r("div",{staticClass:"content"},[r("el-form",{directives:[{name:"loading",rawName:"v-loading",value:e.login_actions.disabled,expression:"login_actions.disabled"}],ref:"data",staticClass:"demo-ruleForm card-box loginform",style:e.formOffset,attrs:{"label-position":"left","label-width":"0px","element-loading-text":"正在"+(e.register===!0?"注册":"登录")+"...",model:e.data,rules:e.rule_data}},[r("h3",{staticClass:"title"},[r("span",{class:[{active:e.register===!1}],on:{click:function(t){e.toggleStatus(!1)}}},[e._v("17duu后台管理系统系统登录")])]),e._v(" "),r("el-form-item",{attrs:{prop:"username"}},[r("el-input",{attrs:{type:"text","auto-complete":"off",placeholder:"账号"},model:{value:e.data.username,callback:function(t){e.data.username=t},expression:"data.username"}})],1),e._v(" "),r("el-form-item",{attrs:{prop:"password"}},[r("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"密码"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.onLogin("data",!0):null}},model:{value:e.data.password,callback:function(t){e.data.password=t},expression:"data.password"}})],1),e._v(" "),e.register===!0?r("el-form-item",{attrs:{prop:"repassword"}},[r("el-input",{attrs:{type:"password","auto-complete":"off",placeholder:"确认密码"},nativeOn:{keyup:function(t){return"button"in t||!e._k(t.keyCode,"enter",13)?void e.onRegister("data"):null}},model:{value:e.data.repassword,callback:function(t){e.data.repassword=t},expression:"data.repassword"}})],1):e._e(),e._v(" "),e.register===!1?r("el-checkbox",{staticStyle:{margin:"0px 0px 35px 0px"},attrs:{checked:e.remumber.remumber_flag},model:{value:e.remumber.remumber_flag,callback:function(t){e.remumber.remumber_flag=t},expression:"remumber.remumber_flag"}},[e._v("记住密码\n                    ")]):e._e(),e._v(" "),r("el-form-item",{staticStyle:{width:"100%"}},[e.register===!1?r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onLogin("data")}}},[e._v("登录\n                        ")]):e._e(),e._v(" "),e.register===!0?r("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onRegister("data")}}},[e._v("注册\n                        ")]):e._e(),e._v(" "),r("el-button",{on:{click:function(t){e.resetForm("data")}}},[e._v("重置")])],1)],1)],1)])],1)],1)},staticRenderFns:[]}}});
//# sourceMappingURL=1.67e1e0933186f7d263a4.js.map