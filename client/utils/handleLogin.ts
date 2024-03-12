import axios, { type AxiosResponse } from 'axios';

import type { Login } from '#types';

type Args = {
  email: string;
  password: string;
};

async function handleLogin(args : Args): Promise<Login | string> {
  const { email, password } = args;

  try {
    const response: AxiosResponse<Login> = await axios
      .post(`${process.env.NEXT_PUBLIC_MONGO_API_URL}/mongo/login`, {
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
}

export default handleLogin;
