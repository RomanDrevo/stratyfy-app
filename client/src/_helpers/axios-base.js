import axios from "axios"

const axiosBase = axios.create({
  baseURL: 'http://localhost:3001/api',
  headers: {'x-auth-token': localStorage.getItem('currentUser')}
});

export default axiosBase


