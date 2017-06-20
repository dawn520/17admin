/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 认证管理
 * @type {Object}
 */
module.exports = [
	{
		name:'获取认证列表',
		method:'withdrawalsList',
		path:'withdrawals',
		type:'get',
	}, {
        name:'修改认证状态',
        method:'withdrawalsEdit',
        path:'withdrawals',
        type:'put',
    }
];