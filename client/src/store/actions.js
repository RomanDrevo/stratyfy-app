import axios_based from '../_helpers/axios-base';
import state from './store';


const actions = {

  login(context, data) {
    const { email, password } = data;

    context.commit('setUser', {});

    context.commit('setLoadingStatus', true);

    axios_based.post('/auth', { email, password })
      .then((res) => {
        // store user details in local storage to keep user logged in between page refreshes
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

  fetchUsers(context, user) {
    console.log("-currUser", user)

    context.commit('setUsersList', []);

    context.commit('setLoadingStatus', true);

    axios_based.get('/users', { params: { user_id: user._id, isAdmin: user.isAdmin } })
      .then(res => {
        context.commit('setUsersList', res.data);
        context.commit('setLoadingStatus', false);
      })
      .catch((e) => {
        console.log('--e: ', e);
        context.commit('setError', e);
        context.commit('setUsersList', null);
      })
      .finally(() => {
        context.commit('setLoadingStatus', false);
      });
  },
};

export default actions;
