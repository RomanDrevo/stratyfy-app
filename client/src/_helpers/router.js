import Vue from 'vue';
import Router from 'vue-router';
import { authenticationService } from '@/_services';
import HomePage from '@/home/HomePage';
import LoginPage from '@/login/LoginPage';
import UsersPage from '@/users/UsersPage';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage,
      meta: { authorize: [] },
    },
    {
      path: '/login',
      component: LoginPage,
    },
    {
      path: '/users',
      component: UsersPage,
    },

    // otherwise redirect to home
    { path: '*', redirect: '/' },
  ],
});

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const { authorize } = to.meta;
  const currentUser = authenticationService.getCurrentUser();

  if (authorize) {
    if (!currentUser) {
      // not logged in so redirect to login page with the return url
      return next({ path: '/login', query: { returnUrl: to.path } });
    }

    // check if route is restricted by role
    if (authorize.length && !authorize.includes(currentUser.role)) {
      // role not authorised so redirect to home page
      return next({ path: '/' });
    }
  }

  next();
});
