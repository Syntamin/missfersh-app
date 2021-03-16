import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Classify from '../views/Classify.vue';

VueRouter.prototype.back = false;
VueRouter.prototype.goback = function () {
  this.back = true;
  this.go(-1);
};
Vue.use(VueRouter);

const routes = [
  {
    path: '*',
    redirect: '/home',
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    redirect: { name: 'Classify' },
    children: [
      {
        name: 'Classify',
        path: 'classify',
        component: Classify,
      },
      {
        name: 'Shopping',
        path: 'shopping',
        component: () => import('../views/Shopping.vue'),
      },
    ],
  },
  {
    name: 'Search',
    path: '/search',
    component: () => import('../views/Search.vue'),
  },
  {
    name: 'My',
    path: '/my',
    redirect: { name: 'Classify' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 为了防止路由跳转后多次添加商品造成重复
  if (to.fullPath === '/home/classify') {
    router.app.$options.store.commit('refreshGoodsList');
  }
  next();
});

export default router;
