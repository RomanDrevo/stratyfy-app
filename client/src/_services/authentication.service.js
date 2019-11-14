import { BehaviorSubject } from 'rxjs';
import axios_based from '../_helpers/axios-base';
import { router } from '@/_helpers';

// import config from 'config';


export const getCurrentUser = () => {
  const user = localStorage.getItem('currentUser');
  return JSON.parse(user);
};

const login = (email, password) => axios_based.post('/auth', { email, password }).then((res) => {
  // store user details and token in local storage to keep user logged in between page refreshes
  localStorage.setItem('currentUser', JSON.stringify(res.data));

  return res.data;
});

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
}

const validateIsLoggedIn = () => {
  const user = localStorage.getItem('currentUser');
  if (!user) {
    router.push('/login');
  }
};

export const authenticationService = {
  login,
  logout,
  getCurrentUser,
  validateIsLoggedIn,
};
