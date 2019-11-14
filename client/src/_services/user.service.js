import config from 'config';
import axios_based from '../_helpers/axios-base';


function getAll() {
  const user = JSON.parse(localStorage.getItem('currentUser'));

  console.log('user^^^: ', user);

  return axios_based.get('/users', { params: { user_id: user._id, isAdmin: user.isAdmin } })
    .then(res => console.log(res));
}

function getById(id) {
  return axios_based.get('/users/me');
  // .then(handleResponse);
}

export const userService = {
  getAll,
  getById,
};
