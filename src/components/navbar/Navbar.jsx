import React from 'react'
import Logo from './Logo'
import SignUp from './SignUp'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-green-500'>
        <Logo />
      <div>navbar</div>
      <SignUp/>
    </div>
  )
}

export default Navbar
