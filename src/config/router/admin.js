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
            component: Modules.Demo.User.List
        }, {
            path: 'others',
            name: '编辑用户',
            icon: 'edit',
            component: Modules.Demo.User.Edit
        }]
    }]
}];