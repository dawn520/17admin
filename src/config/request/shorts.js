/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 短租管理
 * @type {Object}
 */
module.exports = [
	{
		name:'获取轮播图列表',
		method:'slidesList',
		path:'slides',
		type:'get',
	},
    {
        name:'编辑轮播图',
        method:'editSlides',
        path:'slides',
        type:'put',
    },
    {
        name:'删除轮播图',
        method:'deleteSlides',
        path:'slides',
        type:'delete',
    },
    {
        name:'上传轮播图',
        method:'uploadSlides',
        path:'slides',
        type:'post',
    },
    {
        name:'获取更新',
        method:'getUpgrade',
        path:'upgrade',
        type:'get',
    },
];