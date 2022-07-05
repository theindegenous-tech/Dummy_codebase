import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import "./Signup.css";
import { Navigate, useNavigate } from 'react-router-dom'







function Login() {
  // React States
  const [login, setlogin] = useState(true);
  let { user, setUser } = useContext(UserContext);
  const handleSubmit = async (e) => {

    //Prevent page reload
    e.preventDefault();

    var { email, password } = document.forms[0];
    try {
     let res= await axios({
        method: 'post',
        url: 'http://localhost:8000/login/',
        data: {
          email: email.value,
          password: password.value
        },
        withCredentials: true
      });
      setlogin(true);
      console.log(res);
      
    } catch (error) {
      console.log(error)
    }
    
  };


  useEffect(() => {
    const getloggedinuserdetails = async () => {
      try {
        let res = await axios({
          method: 'get',
          url: 'http://localhost:8000/user',
          withCredentials: true
        });
        // console.log(res.data)        
        setUser(res.data)

      } catch (error) {
        console.log(error)
      }
    }
    if (login) {
      getloggedinuserdetails();
      setlogin(false)
    }
  }, [login]);

    let navigate = useNavigate(); 
  const handleClick=()=>{
    let path = `/signup`; 
    navigate(path);
  }
  
  return (user ?
    <Navigate to="/dashboard/home" /> :
    <div className="app">
      <div className="login-form">
        <div className="title">Login</div>
        <div className="form">
          <form method="POST" onSubmit={handleSubmit} >
            <div className="input-container">
              <label>Email </label>
              <input type="email" name="email" />
            </div>
            <div className="input-container">
              <label>Password </label>
              <input type="password" name="password"  />
            </div>
            <div className="button-container">
              <input type="submit" />
            </div>
            <div style={{display:'flex'}}>
                <div style={{fontSize:'16px', padding:'10px'}}>Don't have an Account?</div>
                <div style={{paddingTop:'10px'}}>
                    <button style={{background:'#01d28e', border: '1px solid #01d28e',color:'#FFFFFF'}} onClick={handleClick}>Signup</button>
                </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;