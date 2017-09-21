/**
 * Created by sailengsi on 2017/4/30.
 */
import {
    Home,
    Content,
    Modules
} from '../../components/';

module.exports = [{
    path: '/admin',
    name: '17度',
    icon: 'inbox',
    component: Home,
    redirect: '/admin/shorts',
    children: [{
        path: 'shorts',
        name: '短租设置',
        icon: 'inbox',
        component: Content,
        redirect: '/admin/shorts/slide',
        children: [{
            path: 'slide',
            name: '轮播图',
            icon: 'reorder',
            component: Modules.Admin.Shorts.Slide.List
        }, {
            path: 'uploadSlide',
            name: '上传轮播图',
            icon: 'upload',
            component: Modules.Admin.Shorts.Slide.Upload
        }]
    }, {
        path: 'identity',
        name: '认证',
        icon: 'inbox',
        component: Content,
        redirect: '/admin/identity',
        children: [{
            path: 'list',
            name: '认证列表',
            icon: 'reorder',
            component: Modules.Admin.Identity.List
        }]
    }, {
        path: 'withdrawal',
        name: '提现',
        icon: 'inbox',
        component: Content,
        redirect: '/admin/withdrawal',
        children: [{
            path: 'list',
            name: '提现列表',
            icon: 'reorder',
            component: Modules.Admin.Withdrawal.List
        }]
    },{
        path: 'order',
        name: '订单',
        icon: 'inbox',
        component: Content,
        redirect: '/admin/order',
        children: [{
            path: 'list',
            name: '人工介入',
            icon: 'reorder',
            component: Modules.Admin.Order.List
        }]
    }],
}];