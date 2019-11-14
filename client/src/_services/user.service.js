import axios_based from '../_helpers/axios-base';


function getAll() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return axios_based.get('/users', { params: { user_id: user._id, isAdmin: user.isAdmin } });
}

function getById(id) {
  return axios_based.get('/users/me');
}

function createUser(email, password) {
  return axios_based.post('/users', { email, password });
}

function removeUser(user) {
  return axios_based.post('/users/delete', { user });
}

function editUser(user) {
  return axios_based.put('/users', user);
}

export const userService = {
  getAll,
  getById,
  createUser,
  removeUser,
  editUser,
};
