import { BehaviorSubject } from 'rxjs';
import axios from "axios"

import config from 'config';
import { requestOptions, handleResponse } from '@/_helpers';

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(email, password) {
    // return fetch(`${config.apiUrl}/users/authenticate`, requestOptions.post({ username, password }))
    //     .then(handleResponse)
    //     .then(user => {
    //         // store user details and jwt token in local storage to keep user logged in between page refreshes
    //         localStorage.setItem('currentUser', JSON.stringify(user));
    //         currentUserSubject.next(user);
    //
    //         return user;
    //     });
  // return fetch("http://localhost:3000/api/auth", requestOptions.post({ email, password }))
  //   .then(handleResponse)
  //   .then(user => {
  //     // store user details and jwt token in local storage to keep user logged in between page refreshes
  //     console.log("--token: ", user)
  //     localStorage.setItem('currentUser', JSON.stringify(user));
  //     currentUserSubject.next(user);
  //
  //     return user;
  //   });

  return axios.post("http://localhost:3000/api/auth", { email, password }).then(res => {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    console.log("--token: ", res.data)
    localStorage.setItem('currentUser', JSON.stringify(res.data));
    currentUserSubject.next(res.data);

    return res.data;
  });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
}
