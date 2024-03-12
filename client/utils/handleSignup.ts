import axios, { type AxiosResponse } from 'axios';

async function handleSignup(name: string, email: string, password: string) {
  try {
    const response: AxiosResponse<{ status: number, message: string }> = await axios.post(`${process.env.NEXT_PUBLIC_MONGO_API_URL}/mongo/register`, {
      name,
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
}

export default handleSignup;
