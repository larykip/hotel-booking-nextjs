"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Logo from './Logo';
import SignUp from './SignUp';
import SignInDropDown from './SignInDropDown';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/auth/login', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const userData = await response.json();
          setIsLoggedIn(true);
          setUser(userData);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        handleLogout();
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    // Logout logic here (invalidate cookie, redirect to home)
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        // localStorage.removeItem('MetroAuthToken');
        setIsLoggedIn(false);
        setUser(null);
        router.push('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className="flex px-8 justify-between items-center">
      <Logo />
      {isLoggedIn && user ? (
        <div className='flex items-center'>
          {/* Dropdown menu for logged in users */}
          {/* Handles signout and all dashboard routes */}
          <SignInDropDown handleLogout={handleLogout} user={user}/>
        </div>
      ) : (
        <SignUp />
      )}
    </div>
  );
};

export default Navbar;