import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/ShoppingCart.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('../views/Auth.vue'),
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Dashboard.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'dashboard') {
    // require admin privilege to access dashboard
    let admin = false;
    if (store.state.user) {
      admin = store.state.user.admin;
    }
    if (admin) {
      next();
    } else {
      next({ name: 'home' });
    }
  } else {
    next();
  }
});

export default router;
