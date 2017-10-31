/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 文章管理
 * @type {Object}
 */
module.exports = [
	{
		name:'获取文章列表',
		method:'selectArticle',
		path:'articles',
		type:'get',
	},
	{
		name:'添加/修改文章',
		method:'articles',
		path:'articles',
		type:'post',
	},

	{
		name:'删除文章',
		method:'deleteArticle',
		path:'/articles',
		type:'delete',
	},
	{
		name:'查看文章详情',
		method:'findArticle',
		path:'/articles',
		type:'get',
	}
];