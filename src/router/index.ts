import Vue from 'vue';
import VueRouter, {Route} from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store';

Vue.use(VueRouter);

const Routes = {
    Home: '/',
    Keys: '/keys',

};

const routes = [
    {
        path: Routes.Home,
        name: 'home',
        component: Home,
    },
    {
        path: Routes.Keys,
        name: 'keys',

        component: () => import(/* webpackChunkName: "Welcome" */ '@/views/Keys.vue'),
        beforeEnter: requiresAuth,

    },
];

function requiresAuth(to: Route, from: Route, next: (to?: string) => void) {
    if (store.state.IsLocked) {
        next(`${Routes.Home}?redirect=${encodeURIComponent(to.path)}`);
        return;
    }
    next();
}

const router = new VueRouter({
    routes,
});

export default router;
