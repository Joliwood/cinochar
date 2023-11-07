import axios from 'axios';
import type { UserDecodedToken } from '@/@types';
import { jwtDecode } from 'jwt-decode';

const hendleAddPoints = async (points: number) => {
  const storedToken: string | null = localStorage.getItem('token');

  if (!storedToken) {
    return 'No token found.';
  }

  // Decode the JWT to access user information
  const decodedToken: any = jwtDecode(storedToken);

  const { userId }: UserDecodedToken = decodedToken;

  await axios.patch('/api/addPoints', {
    userId,
    points,
  });

  return 'Points added.';
};

export default hendleAddPoints;
