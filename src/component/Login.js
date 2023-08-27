import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'

const Login = (props) => {
  const[credential,setCredential]=useState({email:"",password:""});
  const navigate=useNavigate();
  
  const host = "https://inotebook-1c77.onrender.com";
  const onSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email:credential.email,password:credential.password }),
    });
    const json= await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token',json.authtoken);
      navigate("/");
      props.showAlert("Successfully Logged in",'Success')
    }
    else{
      props.showAlert("Email or password are incorrect",'Danger')
    }
  }

  const onchange=(e)=>{
    setCredential({...credential,[e.target.name]:e.target.value})
  }

  return (
    <div className='login-box'>
      <form onSubmit={onSubmit}>
        <h1>Login</h1>
        <div className="input-box">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={onchange} value={credential.email}/>
        </div>
        <div className="input-box">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={onchange} value={credential.password} />
        </div>
        <button className='btn'>Login</button>
        <div className="input-box">
            <p>New User <Link to="/signup">Register</Link></p>
            <Link to="">Forgot Password</Link>
        </div>
      </form>
    </div>
  )
}

export default Login