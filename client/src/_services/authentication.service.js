import { BehaviorSubject } from 'rxjs';
import axios_based from "../_helpers/axios-base";
import { router } from '@/_helpers';

// import config from 'config';


export const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));


export const getCurrentUser = () => {
  return localStorage.getItem('currentUser');

}

const login = (email, password) => {

  return axios_based.post("/auth", { email, password }).then(res => {
    // store user details and token in local storage to keep user logged in between page refreshes
    console.log("--token: ", res.data)
    localStorage.setItem('currentUser', JSON.stringify(res.data));
    currentUserSubject.next(res.data);

    setTimeout(() => localStorage.removeItem('currentUser'), 20*1000)

    return res.data;
  });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}

const validateIsLoggedIn = () =>{

    const user = localStorage.getItem('currentUser');
    console.log("---USER: ", user)
    if(!user){
      router.push("/login")
    }

}

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value },
  getCurrentUser,
  validateIsLoggedIn
};




