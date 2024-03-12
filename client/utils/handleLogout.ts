async function handleLogout(): Promise<void> {
  try {
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error logging out:', error);
  }
}

export default handleLogout;
