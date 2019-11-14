import config from 'config';
import axios_based from "../_helpers/axios-base";


function getAll() {
  return axios_based.get("/users")
    .then(res => console.log(res));
}

function getById(id) {
  // return axios.get(`${config.apiUrl}/users/${id}`)
  return axios_based.get("/users/me")
  // .then(handleResponse);
}

export const userService = {
    getAll,
    getById
};


