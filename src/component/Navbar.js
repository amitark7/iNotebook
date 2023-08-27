import React from 'react';
import '../App.css';
import {Link, useNavigate} from "react-router-dom";

export default function Navbar() {
  let navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }

  return (
    <div className='navbar'>
        <div className="max-width">
            <div className="logo">
                <Link to='/'> <h1 className='text'> iNotebook</h1> </Link>
            <ul className='menu'>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
            </div>
           {!localStorage.getItem('token')?<div>
              <Link to='/login' className='btn'>Login</Link>
              <Link to='/signup' className='btn'>SignUp</Link>
            </div>:<button onClick={handleLogout} className='btn'>Logout</button>}
        </div>

    </div>
  )
}


