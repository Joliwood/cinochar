import axios, { AxiosResponse } from 'axios';
import type { Login } from '@/@types';

const handleLogin = async (email: string, password: string) => {
  try {
    const response: AxiosResponse<Login> = await axios.post('/api/login', {
      email,
      password,
    });

    if (response.data.token) {
      // Store the JWT in local storage or a secure cookie
      localStorage.setItem('token', response.data.token);
      return response.data;
    }

    return response.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return `Axios error: ${error.message}`;
    }
    if (error instanceof Error) {
      return `General error: ${error.message}`;
    }
    return 'Unknown error occurred';
  }
};

export default handleLogin;
