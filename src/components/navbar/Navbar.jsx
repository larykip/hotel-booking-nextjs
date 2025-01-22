"use client";

import Logo from './Logo';
import SignUp from './SignUp';
import SignInDropDown from './SignInDropDown';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const { isLoggedIn, user, handleLogout } = useAuth();

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