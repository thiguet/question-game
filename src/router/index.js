import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes';
import store from '@/store/';
import { getUser } from '@/_services/userServices';

Vue.use(VueRouter);

const specialPaths = [
  '/a',
  '/',
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const { authorize } = to.meta;
  const user = getUser();

  if (authorize.length) {
    if (Object.keys(user).length === 0) {
      return next({ path: specialPaths.includes(from.path) ? from.path : '/' });
    }

    store.dispatch('user/loginSuccess', { ...user });

    if (authorize.length && !authorize.includes(user.role)) {
      return next({ path: specialPaths.includes(from.path) ? from.path : '/' });
    }
  }
  return next();
});

export default router;
