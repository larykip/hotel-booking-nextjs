"use client"

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
      const token = Cookies.get('token');
      if (token) {
        setIsLoggedIn(true);
        try {
          const response = await fetch('/api/auth/user', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            handleLogout();
          }
        } catch (error) {
          console.error('Error fetching user:', error);
          handleLogout();
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = () => {
    Cookies.remove('token');
    setIsLoggedIn(false);
    setUser(null);
    router.push('/');
  };

  return (
    <div className='flex justify-between items-center'>
      <Logo />
      {isLoggedIn && user ? (
        <div>
          <SignInDropDown/>
          <Link href="/dashboard">Welcome, {user.firstName}! </Link>
          <br/>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <SignUp />
      )}
    </div>
  );
};

export default Navbar;