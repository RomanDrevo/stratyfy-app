export default {
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
    state.isLoggedIn = payload;
  },
  setUsersList(state, payload) {
    state.usersList = payload;
  },
  updateUsersList(state, payload) {
    state.usersList = [...state.usersList, payload];
  },
  setSuccessMessage(state, payload) {
    state.successMessage = payload;
  },

};
