import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store/index';
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
  base: '/lic'
});

router.beforeEach((to, from, next) => {
  if (store.getters.isLogin) {
    if (to.name == 'Login') {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else if (!store.getters.isLogin && to.name != 'Login') {
    next({
      name: 'Login'
    });
  } else {
    next();
  }
});
export default router;
