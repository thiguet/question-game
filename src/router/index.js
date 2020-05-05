import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from '@/router/routes';
// import authenticationService from '@/_services/authServices';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

// router.beforeEach((to, from, next) => {
//   const { authorize } = to.meta;
//   const currentUser = authenticationService.currentUserValue;

//   if (authorize.length) {
//     if (!currentUser) {
//       return next({ path: '/l' });
//     }

//     if (authorize.length && !authorize.includes(currentUser.role)) {
//       return next({ path: '/r' });
//     }
//   }
//   return next();
// });

export default router;
