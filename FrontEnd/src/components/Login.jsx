import React, { useEffect, useState } from "react";
import {Navigate, useNavigate} from "react-router-dom"

const Login = () => {

    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const Navigate=useNavigate();

    useEffect(()=>{
      const auth=localStorage.getItem('user');
      if(auth){
        Navigate('/') 
      }
    },[])

    const handleLogin=async ()=>{
        let result = await fetch('http://localhost:5000/login',{
          method:"post",
          body: JSON.stringify({email,password}),
          headers:{
            'Content-Type':'application/json'
          }
        });
        result=await result.json();
        console.log(result);
        if(result.auth){
          localStorage.setItem("user",JSON.stringify(result.user))
          localStorage.setItem("token",JSON.stringify(result.auth))
          Navigate('/')
        }
        
    }

  return (
    <div className="singupdiv">
      <h1>Login Here!</h1>
      <input className="inputbox" type="email" placeholder="Enter Email" onChange={(e)=>setEmail(e.target.value)} />
      <input
        className="inputbox"
        type="password"
        placeholder="Enter the Password" onChange={(e)=>setPassword(e.target.value)}
      />
      <button type="submit" className="appbutton" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Login;
