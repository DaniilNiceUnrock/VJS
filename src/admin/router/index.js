import Router from 'vue-router';

const userWorks = {
    template: '<div>UserWorks</div>'
};

const Error =  {
    template: '<div>  <div>404 Not found</div> <router-link to="/" > На главную </router-link></div> '
};

const routes = [
    {
        path: "*" ,
        component: Error,
    },
    {
        path: "" ,
        component: () => import('../components/login/login.vue'),
    },
    {
        path: "/about" ,
        component: () => import('../components/about.vue'),
        /*beforeEnter: (to, from, next) => {
            next(); // разрешаем переход
        },*/
    },
    {
        path: "/works" ,
        component: () => import('../components/work.vue'),
        children: [
            {
                path: '/works/profile',
                component: userWorks
            }
        ]
    },
    {
        path: "/newcategory",
        component: () => import('../components/newcat/newcat.vue'),
    },
    {
        path: "/reviews" ,
        component: () => import('../components/reviews'),
    }
];

//const router = new Router({
//    routes,
//});
//export default router;

export default new Router({ routes});