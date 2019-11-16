import axios_based from "../_helpers/axios-base";

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

export default actions;
