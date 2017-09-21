/**
 * Created by sailengsi on 2017/4/30.
 */
/**
 * 认证管理
 * @type {Object}
 */
module.exports = [
	{
		name:'获取订单列表',
		method:'orderList',
		path:'orders',
		type:'get',
	}, {
        name:'修改订单',
        method:'orderCheck',
        path:'orders/judge',
        type:'put',
    },
    {
        name:'修改订单',
        method:'order',
        path:'orders',
        type:'get',
    }
];