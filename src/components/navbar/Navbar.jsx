import Logo from './Logo'
import SignUp from './SignUp'

const Navbar = () => {
  return (
    <div className='flex justify-between items-center'>
        <Logo />
      {/* <div>Following Airbnb style of no navbar links</div> */}
      
      <SignUp/>
    </div>
  )
}

export default Navbar
