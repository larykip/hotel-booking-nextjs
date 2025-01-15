export const checkAuthStatus = async () => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'GET',
      credentials: 'include'
    });

    if (response.ok) {
      const userData = await response.json();
      return { isLoggedIn: true, user: userData };
    }
    return { isLoggedIn: false, user: null };
  } catch (error) {
    console.error('Error checking login status:', error);
    return { isLoggedIn: false, user: null };
  }
};

export const logout = async () => {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Logout failed');
    }

    // Clear any client-side storage
    localStorage.removeItem('authToken');
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    return false;
  }
};
