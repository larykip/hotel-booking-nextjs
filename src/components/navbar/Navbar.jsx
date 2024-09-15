"use client";
import { useEffect, useState } from 'react';
import Logo from './Logo';
import SignUp from './SignUp';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import SignInDropDown from './SignInDropDown';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('/api/auth/user', {
          method: 'GET',
          credentials: 'include', // Include cookies
        });

        if (response.ok) {
          const userData = await response.json();
          setIsLoggedIn(true);
          setUser(userData);
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Error fetching user:', error);
        handleLogout();
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    // Logout logic here (e.g., remove the cookie, redirect to home)
    fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
      .then(() => {
        setIsLoggedIn(false);
        setUser(null);
        router.push('/');
      })
      .catch(error => console.error('Error during logout:', error));
  };

  // const handleLogout = () => {
  //   Cookies.remove('token');   // Remove token from client-side
  //   setIsLoggedIn(false);      // Reset user state
  //   setUser(null);
  //   router.push('/');          // Redirect to home
  // }; 

  return (
    <div className="flex justify-between items-center">
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