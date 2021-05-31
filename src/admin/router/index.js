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
        path: "/" ,
        component: () => import('../components/about.vue'),
        beforeEnter: (to, from, next) => {
            next(); // разрешаем переход
        },
    },
    {
        path: "/works" ,
        component: () => import('../components/work.vue'),
        children: [
            {
                path: 'profile',
                component: userWorks
            }
        ]
    },
    {
        path: "/reviews" ,
        component: () => import('../components/reviews'),
    }
];

const router = new Router({
    routes,
});

export default router;