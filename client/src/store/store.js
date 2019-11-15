import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
  isLoginModalOpen: false,
};

export default new Vuex.Store({
  state,
});
