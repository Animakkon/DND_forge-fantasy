import {createRouter, createWebHistory} from "vue-router";
import PageNotFound from '../pages/PageNotFound.vue';
import PageCalculator from "../pages/PageCalculator.vue";

export const routes = [
    { path: '/', name: 'home', component: PageCalculator },
    { path: '/home', redirect: '/'  },
    { path: '/calculator', name: 'Calculator', component: PageCalculator },
    { path: '/:pathMatch(.*)', name: '404', component: PageNotFound },
    { path: '/:pathMatch(.*)*', name: '404', component: PageNotFound },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;
