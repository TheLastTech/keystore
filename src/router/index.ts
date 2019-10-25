import Vue from 'vue';
import VueRouter, {Route} from 'vue-router';
import Home from '../views/Home.vue';
import store from '@/store';
import AddKey from '@/components/AddKey.vue';
import Keys from '@/views/Keys.vue';

Vue.use(VueRouter);

export const Routes = {
    Home: '/',
    Keys: '/keys',
    AddKey: '/addkey',

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

        component: Keys,
        beforeEnter: requiresAuth,

    },
    {
        path: Routes.AddKey,
        name: 'addkeys',
        component: AddKey,
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
