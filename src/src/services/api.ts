import axios from 'axios';
  const token: string | null = sessionStorage.getItem('token');
  const baseURL = process.env.VUE_APP_URI; // Replace with your actual API URL
  const api = axios.create({
    baseURL: baseURL, // Replace with your backend URL
    headers: {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
  
  // Request interceptor to add token dynamically
api.interceptors.request.use(
    (config) => {
      const updatedToken = sessionStorage.getItem('token');
      if (updatedToken) {
        config.headers.Authorization = `Bearer ${updatedToken}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

//const api = axios.create({ baseURL });
export default api;