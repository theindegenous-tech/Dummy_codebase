import React, { useEffect,useContext } from "react";
// import  { useState, useEffect, useContext } from "react";
// import { UserContext } from "../context/AuthContext";
// import axios from "axios";
import { ReactComponent as ReactLogo } from "./login.svg";
import "./Signup.css";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import { UserContext } from "../context/AuthContext";


function Login_1() {
  // React States
  let navigate = useNavigate();
  const {setUser} = useContext(UserContext)
  useEffect(()=>{
    const checkLogin=async()=>{
      try{
        let res = await axios({
          method:'get',
          url:'http://64.227.182.173:8000/user/',
          withCredentials:true
        })
        if(res.status === 200) {
          setUser(res.data)
          navigate('/dashboard/home')
        }
      }
      catch(error){
        console.log(error)
      }
    }
    checkLogin()
  },)

  const handleSubmit = async (e) => {

    //Prevent page reload
    e.preventDefault();
    let path = `/login/password`;
    var { email } = document.forms[0];
    navigate(path, { state: { email: email.value } });

  };
  const handleClick = () => {
    let path = `/signup`;
    navigate(path);
  }


  return (<div style={{ height: '1024px', width: '1447px' }}  >
    <div style={{ display: 'flex' ,    justifyContent: 'space-between'}}>
        <h1 style={{ marginLeft: '31px', width: '172px', height: '75px', fontFamily: 'Work Sans', fontSize: '64px', fontWeight: '700', lineHeight: '75px', letterSpacing: '-0.02em', color: '#0E0E2C', marginTop: '24px', marginBottom: 0 }}>
        <a href='/' style={{color:'black'}}>
      Gyani
        </a>    
        </h1>
      
        <div className="row">

        <button onClick={(e) => {e.preventDefault();navigate("/login/email")}} style={{cursor:'pointer', width: '113px', height: '48px', marginTop: '37px', border: '1px solid #EFEFFD', background: '#FFFFFF', borderRadius: '8px', color: '#428CFB', padding: '12px 24px' }}>
          SIGN IN
        </button>
        <button onClick={handleClick} style={{cursor:'pointer', width: '113px', height: '48px', marginTop: '37px', border: '1px solid #EFEFFD', background: '#FFFFFF', borderRadius: '8px', color: '#428CFB', padding: '12px 24px' }}>
        SIGN UP
      </button>

        </div>
    </div>
    <div style={{
      alignItems: 'center',
      justifyContent: 'center', textAlign: 'center',
      marginTop: '54px', height: '71px', width: '635px', marginLeft: '406px', fontFamily: 'Work Sans',
    }}>
      <h2 style={{ margin: 0, fontFamily: 'Work Sans', fontSize: '40px', fontWeight: '700', lineHeight: '47px', letterSpacing: '-0.02em' }}>
        Unlimited books and knowledge.
      </h2>
      <h2 style={{ margin: 0, fontFamily: 'Work Sans', fontSize: '24px', fontWeight: '500', lineHeight: '28px', color: '#0E0E2C' }}>
        Read anywhere. Cancel anytime.
      </h2>
    </div>
    <h3 style={{
      height: '32px', marginTop: '46px', width: '900px',
      alignItems: 'center', justifyContent: 'center', textAlign: 'center',
      marginLeft: '304px', fontFamily: 'Work Sans', fontSize: '24px', fontWeight: '600', lineHeight: '28px', color: '#000000'
    }}>
      Ready to start? Enter your email to create or restart your membership.
    </h3>
    <div style={{ display: 'flex' }}>
      <form method="POST" onSubmit={handleSubmit} style={{ display: 'flex' }}>

        <div style={{ marginLeft: '304px', display: 'flex', flexDirection: 'column', alignItems: 'flexstart', border: 'none', height: '99px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <input type="email" name="email" placeholder="EMAIL ADDRESS" style={{
            width: '659px', border: 'none', marginLeft: 0, height: '48px', marginTop: '8px', borderRadius: '8px',
            backgroundColor: '#ECF1F4', boxShadow: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 0
          }}>
          </input>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flexstart', border: 'none', height: '99px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <input type="submit" value="GET STARTED!" style={{ marginTop: '8px', height: '50px', width: '170px', borderRadius: '8px', backgroundColor: '#428CFB', border: 'none', fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '700', lineHeight: '19px', color: '#FFFFFF', letterSpacing: '0.04em' }} />


        </div>

      </form>
    </div>
    <div className="container">

<ReactLogo />
  </div>

  </div>
  )
}

export default Login_1