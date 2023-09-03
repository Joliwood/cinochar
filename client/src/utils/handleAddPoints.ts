import axios from 'axios';
import jwt_decode from 'jwt-decode';

const handleLogin = async (points: number) => {
  const storedToken: string | null = localStorage.getItem('token');

  if (!storedToken) {
    return 'No token found.';
  }

  // Decode the JWT to access user information
  const decodedToken: any = jwt_decode(storedToken!);

  // OK //
  const { userId } = decodedToken;

  await axios.patch('/api/addPoints', {
    userId,
    points,
  });

  return 'Points added.';
};

export default handleLogin;
