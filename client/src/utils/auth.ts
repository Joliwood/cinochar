import axios, { type AxiosResponse } from 'axios';
import { jwtDecode } from 'jwt-decode';

import type { UserFromMongo, UserDecodedToken } from '#types';

async function auth() {
  const storedToken: string | null = localStorage.getItem('token');

  if (!storedToken) {
    return 'No token found.';
  }

  // Decode the JWT to access user information
  const decodedToken = jwtDecode(storedToken) as UserDecodedToken;

  const { userId }: UserDecodedToken = decodedToken;

  try {
    const response: AxiosResponse<{ user: UserFromMongo }> = await axios.get('/api/getUser', {
      params: { userId },
    });

    return response.data.user;
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

export default auth;
