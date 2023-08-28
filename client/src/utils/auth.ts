import axios from 'axios';
import jwt_decode from 'jwt-decode';

const auth = async () => {
  const storedToken: string | null = localStorage.getItem('token');

  if (!storedToken) {
    return 'No token found.';
  }

  // Decode the JWT to access user information
  const decodedToken: any = jwt_decode(storedToken!);

  const { userId } = decodedToken;

  try {
    const response = await axios.get('/api/getUser', {
      params: { userId },
    });
    return response.data.user;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    }
    return 'An error occurred while authetification.';
  }
};

export default auth;
