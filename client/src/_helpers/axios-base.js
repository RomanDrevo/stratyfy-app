import axios from 'axios';


const axiosBase = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export default axiosBase;
