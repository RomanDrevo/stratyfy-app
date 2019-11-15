import Vue from 'vue';
import Vuex from 'vuex';
import { authenticationService } from '../_services/authentication.service';
import axios_based from '../_helpers/axios-base';

Vue.use(Vuex);

const state = {
  isLoginModalOpen: false,
  isLoggedIn: authenticationService.validateIsLoggedIn(),
  currUser: null,
  loading: false,
  error: null,
};

const mutations = {
  openLoginModal(state) {
    state.isLoginModalOpen = true;
  },
  closeLoginModal(state) {
    state.isLoginModalOpen = false;
  },
  setUser(state, payload) {
    state.user = payload;
  },
  setLoadingStatus(state, payload) {
    state.loading = payload;
  },
  setError(state, payload) {
    state.error = payload;
  },
};

const actions = {
  openLoginModal: ({ commit }) => commit('openLoginModal'),
  closeLoginModal: ({ commit }) => commit('closeLoginModal'),
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
      // return res.data;
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
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
});
