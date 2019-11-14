import config from 'config';
import axios_based from '../_helpers/axios-base';


function getAll() {
  const user = JSON.parse(localStorage.getItem('currentUser'));
  return axios_based.get('/users', { params: { user_id: user._id, isAdmin: user.isAdmin } });
}

function getById(id) {
  return axios_based.get('/users/me');
  // .then(handleResponse);
}

function createUser(email, password) {
  return axios_based.post('/users', { email, password });
}

function removeUser(user) {
  console.log('--userId: ', user);
  return axios_based.post('/users/delete', { user });
}

export const userService = {
  getAll,
  getById,
  createUser,
  removeUser,
};
