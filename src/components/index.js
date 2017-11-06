// import Login from './Login/';
//
// import Home from './Routeview/Home.vue';
// import Content from './Routeview/Content.vue';
// import NotFound from './Routeview/NotFound.vue';

import Modules from './Modules/';


const Login = resolve => require(['./Login/'],resolve);
const Home = resolve => require(['./Routeview/Home.vue'],resolve);
const Content = resolve => require(['./Routeview/Content.vue'],resolve);
const NotFound = resolve => require(['./Routeview/Home.vue'],resolve);



module.exports = {
    Login,

    Home,
    Content,
    NotFound,

    Modules
};