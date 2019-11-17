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
        if (!store.state.currUser) next({ name: '/' });

        next({ path: '/' });

        if (store.state.currUser && !store.state.currUser.isAdmin) {
          next({ path: '/' });
        } else {
          next({ path: '/' });
        }
      },
    },

    // otherwise redirect to home
    { path: '*', redirect: '/' },
  ],
});
