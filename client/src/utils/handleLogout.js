import { redirect } from 'next/navigation';

async function handleLogout() {
  try {
    localStorage.removeItem('token');
    redirect('/');
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

export default handleLogout;
