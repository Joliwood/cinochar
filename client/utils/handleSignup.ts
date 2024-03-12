import axios, { type AxiosResponse } from 'axios';

type Args = {
  name: string;
  email: string;
  password: string;
};

async function handleSignup(args: Args): Promise<string> {
  const { name, email, password } = args;

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
