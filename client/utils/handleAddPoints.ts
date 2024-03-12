import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

import type { UserDecodedToken } from '#types';

type Args = {
  pointsEarned: number;
};

async function handleAddPoints(args: Args): Promise<string> {
  const { pointsEarned } = args;
  const storedToken: string | null = localStorage.getItem('token');

  if (!storedToken) {
    return 'No token found.';
  }

  // Decode the JWT to access user information
  const decodedToken: any = jwtDecode(storedToken);

  const { userId }: UserDecodedToken = decodedToken;

  axios({
    method: 'post',
    url: `${process.env.NEXT_PUBLIC_MONGO_API_URL}/mongo/addPoints`,
    data: {
      userId,
      pointsEarned,
    },
  });

  return 'Points added.';
}

export default handleAddPoints;
