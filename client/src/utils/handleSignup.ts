import axios, { AxiosResponse } from 'axios';

const handleSignup = async (pseudo: string, email: string, password: string) => {
  try {
    const response: AxiosResponse<{ status: number, message: string }> = await axios.post('/api/register', {
      pseudo,
      email,
      password,
    });
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

export default handleSignup;
