import axios, { AxiosInstance } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  },
);

export default instance;
