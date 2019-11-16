import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VModal from 'vue-js-modal'
import { router } from './_helpers';
import App from './app/App';
import store from './store/store';

Vue.use(VModal)

Vue.use(Vuelidate);

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store,
});
