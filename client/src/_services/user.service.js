import axios_based from '../_helpers/axios-base';


function getById(id) {
  return axios_based.get('/users/me');
}

// function createUser(email, password) {
//   return axios_based.post('/users', { email, password });
// }

// function removeUser(user) {
//   return axios_based.post('/users/delete', { user });
// }

// function editUser(user) {
//   return axios_based.put('/users', user);
// }

export const userService = {
  getById,
};
