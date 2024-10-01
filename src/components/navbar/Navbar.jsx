"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { verifyToken } from '@/lib/tokenUtils';
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
        const token = localStorage.getItem('MetroAuthToken');
        if (token) {
          const decodedToken = await verifyToken(token);
          if (decodedToken) {
            setIsLoggedIn(true);
            setUser(decodedToken);
          } else {
            handleLogout();
          }
        }
      } catch (error) {
        console.error('Error verifying token:', error);
        handleLogout();
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    // Logout logic here (e.g., remove the cookie, redirect to home)
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