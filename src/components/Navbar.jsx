import { Link } from 'react-router-dom'


function Navbar() {
  return (
    <div className='navbar'>
      <h2>JobPortal</h2>

      <div className='nav-links'>
        <Link to='/'>Home</Link>
        <Link to='/profile'>Profile</Link>
        <Link to='/login'>Login</Link>
        <Link to='/register'>Register</Link>
        <Link to='/admin-login'>Admin</Link>
      </div>
    </div>
  )
}

export default Navbar