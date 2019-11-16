import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/pages/home/HomePage';
import UsersPage from '@/pages/users/UsersPage';
// import state from '../store/store'
import store from '../store/store';

Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: HomePage,
    },
    {
      path: '/users',
      component: UsersPage,
      beforeEnter(to, from, next) {
        if (!store.state.currUser.isAdmin) {
          next({
            name: '/',
          });
        } else {
          next();
        }
      },
    },

    // otherwise redirect to home
    { path: '*', redirect: '/' },
  ],
});
