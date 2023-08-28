import axios from 'axios';

const handleLogin = async (email: string, password: string) => {
  try {
    const response = await axios.post('/api/login', {
      email,
      password,
    });

    // Store the JWT in local storage or a secure cookie
    localStorage.setItem('token', response.data.token);

    const redirect = '/';
    window.location.href = redirect;

    return response.data;
  } catch (error: any) {
    if (error.response) {
      return error.response.data.message;
    }
    return 'An error occurred during login.';
  }
};

export default handleLogin;
