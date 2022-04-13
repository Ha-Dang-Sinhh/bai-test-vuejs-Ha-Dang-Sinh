import VueRouter from "vue-router";
import Vue from "vue";
Vue.use(VueRouter);

export const router = new VueRouter({
    routes:[
        {
            path: '/',
            name: 'home',
            component:()=> import('@/pages/HomeComponent')
        },
        {
            path: '/',
            name: 'favorite',
            component:()=> import('@/pages/FavoriteComponent')
        },
    ],
    mode:"history"
})