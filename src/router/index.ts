import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import store from "@/store/index";
Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "",
    redirect: "/home",
    meta: {
      title: "首页"
    }
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/users",
        name: "Users",
        meta: {
          title: "用户列表"
        },
        component: () => import("../views/Users.vue")
      }
      // {
      //   path: "editor",
      //   name: "Editor",
      //   meta: {
      //     title: "富文本编辑"
      //   },
      //   component: () => import("../views/QuillEdit.vue")
      // }
    ]
  },
  // {
  //   path: '/users',
  //   name: 'Users',
  //   component: () => import('../views/Users.vue')
  // },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue")
  }
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (store.getters.isLogin) {
    if (to.name == "Login") {
      next({ name: "Home" });
    } else {
      next();
    }
  } else if (!store.getters.isLogin) {
    if (to.name == "Register" || to.name == "Login") {
      next();
    } else {
      next({
        name: "Login"
      });
    }
  }
});
export default router;
