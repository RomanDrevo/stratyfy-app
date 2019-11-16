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
  removeUserFromList(state, payload) {
    state.usersList = state.usersList.filter(x => x._id !== payload.userId);
  },
  editUser(state, user) {

    const objIndex = state.usersList.findIndex((obj => obj._id === user._id));

    state.usersList[objIndex].email = user.email
  },
};
