import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://arsenchernov-blog-default-rtdb.europe-west1.firebasedatabase.app/financeTracker',
});

export default axiosApi;