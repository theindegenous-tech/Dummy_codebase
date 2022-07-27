import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import "./Signup.css";
import { Navigate, useNavigate } from 'react-router-dom'







function Signup() {
  // React States
  const [signup, setSignup] = useState(false);
  let { user, setUser } = useContext(UserContext); 
  const handleSubmit = async (e) => {

    //Prevent page reload
    e.preventDefault();

    var { firstname,lastname,email, password } = document.forms[0];
    try {
     let signedupUserDetails= await axios({
        method: 'post',
        url: 'http://localhost:8000/signup/',
        data: {
          first_name:firstname.value,
          last_name:lastname.value,
          email: email.value,
          password: password.value
        },
        withCredentials: true
      });
      setSignup({email:signedupUserDetails.data.email,password:password.value});
      
    } catch (error) {
      console.log(error)
    }
    
  };



  useEffect(() => {
    const loginuser = async () => {
      try {
        let userDetails= await axios({
          method: 'post',
          url: 'http://localhost:8000/login/',
          data: {
            email: signup.email,
            password: signup.password
          },
          withCredentials: true
        });   
        setUser(userDetails.data)
      } catch (error) {
        console.log(error)
      }
    }
    if (signup) {
      loginuser();
    }
  }, [signup]);
  

  let navigate = useNavigate(); 
  const handleClick=()=>{
    let path = `/login`; 
    navigate(path);
  }
  
  return (user ?
    <Navigate to="/dashboard/home" /> :
    <div className="app">
      <div className="login-form">
        <div className="title">Signup</div>
        <div className="form">
          <form method="POST" onSubmit={handleSubmit} >
            <div className="input-container">
              <label>Firstname </label>
              <input type="text" name="firstname" required />
            </div>
            <div className="input-container">
              <label>Lastname </label>
              <input type="text" name="lastname" required />
            </div>
            <div className="input-container">
              <label>Email </label>
              <input type="email" name="email" required />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="password" required />
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
            <div style={{display:'flex'}}>
                <div style={{fontSize:'16px', padding:'10px'}}>Login</div>
                <div style={{paddingTop:'10px', alignItems:'right', marginRight:'0px'}}>
                    <button style={{background:'#01d28e', border: '1px solid #01d28e',color:'#FFFFFF'}} onClick={handleClick}>Login</button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;