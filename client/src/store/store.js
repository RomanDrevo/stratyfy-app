import Vue from 'vue';
import Vuex from 'vuex';
import { authenticationService } from '../_services/authentication.service';
import axios_based from '../_helpers/axios-base';

Vue.use(Vuex);

const state = {
  isLoggedIn: !!localStorage.getItem('currentUser'),
  currUser: localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')),
  loading: false,
  error: null,
  // localStorageUser: null,
};

const mutations = {
  setUser(state, payload) {
    state.currUser = payload;
    state.currUser = payload;
  },
  setLoadingStatus(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
  setLoginStatus(state, payload) {
    console.log('payload: ', payload);
    state.isLoggedIn = payload;
  },
};

const actions = {

  login(context, data) {
    const { email, password } = data;

    context.commit('setUser', {});

    context.commit('setLoadingStatus', true);

    axios_based.post('/auth', { email, password })
      .then((res) => {
      // store user details and token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(res.data));
        context.commit('setUser', res.data);
        context.commit('setLoadingStatus', false);
        context.commit('setLoginStatus', true);
      })
      .catch((e) => {
        console.log('--e: ', e);
        context.commit('setError', e);
        context.commit('setUser', null);
      })
      .finally(() => {
        context.commit('setLoadingStatus', false);
      });
  },

  logout(context) {
    context.commit('setLoadingStatus', true);
    localStorage.removeItem('currentUser');
    context.commit('setLoginStatus', false);
    context.commit('setLoadingStatus', false);
  },
};

const getters = {
  loading: state => state.loading,
  error: state => state.error,
  currentUser: state => state.currUser,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
