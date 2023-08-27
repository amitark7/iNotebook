import React ,{useState} from 'react'
import {useNavigate} from 'react-router-dom'

const SignUp = (props) => {
  const[credential,setCredential]=useState({name:"", email:"",password:""});
  const navigate=useNavigate();

  const onSubmit=async (e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:credential.name,email:credential.email,password:credential.password}),
    });
    const json= await response.json();
    console.log(json);
    if(json.success){
      localStorage.setItem('token',json.authtoken);
      navigate("/");
      props.showAlert("Successfully SignUp Welcome to our iNotebook",'Success')
    }
    else{
      props.showAlert("email already existed",'Danger')
    }
  }
  
  const onchange=(e)=>{
    setCredential({...credential,[e.target.name]:e.target.value})
  }
  return (
    <div className='signup-box'>
      <form onSubmit={onSubmit}>
        <h1>SignUp</h1>
        <div className="input-box">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" onChange={onchange} value={credential.name}/>
        </div>
        <div className="input-box">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" onChange={onchange} value={credential.email}/>
        </div>
        <div className="input-box">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" onChange={onchange} value={credential.password} />
        </div>
        <div className="input-box">
            <label htmlFor="cpassword">Confirm Password</label>
            <input type="password" name="cpassword" id="cpassword" onChange={onchange} />
        </div>
        <button className='btn'>Signup</button>
      </form>
    </div>
  )
}

export default SignUp
