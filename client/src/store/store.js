import Vue from 'vue';
import Vuex from 'vuex';
import axios_based from '../_helpers/axios-base';
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

const state = {
  isLoggedIn: !!localStorage.getItem('currentUser'),
  currUser: localStorage.getItem('currentUser') && JSON.parse(localStorage.getItem('currentUser')),
  loading: false,
  error: null,
};

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
});
