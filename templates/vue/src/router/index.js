import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);


const routes = [
    {
        path: "/home",
        name: "/home",
        component: () => import("@/views/home.vue"),
    },
    {
        path: "/about",
        name: "about",
        component: () => import("@/views/about.vue"),
    },
];


const router = new Router({
    mode: "history",
    base: __dirname,
    routes,
});


router.beforeEach((to, from, next) => {
    next();
});


export default router;