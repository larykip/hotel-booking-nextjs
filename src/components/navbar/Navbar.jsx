import React from 'react'
import Logo from './Logo'
import SignUp from './SignUp'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center bg-green-500'>
        <Logo />
      <div>NAVBAR LINKS to placed here!</div>
      
      <SignUp/>
    </div>
  )
}

export default Navbar
