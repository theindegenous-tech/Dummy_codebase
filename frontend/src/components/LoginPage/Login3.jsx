import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
// import "./Signup.css";
import { useLocation, useNavigate } from 'react-router-dom'

function Login_3() {
  const { state } = useLocation()
  const { email } = state
  let { user, setUser } = useContext(UserContext);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {

    //Prevent page reload
    e.preventDefault();

    var { email, password } = document.forms[0];
    try {
            let res = await axios({
        headers: {
          'Access-Control-Allow-Origin' : '*',
          'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
          },
        method: 'post',
        url: 'http://142.93.218.227:8000/login/',
        data: {
          email: email.value,
          password: password.value
        },
        withCredentials:true
      });
      setUser(res.data)
      if(user) {
        navigate("/dashboard/home")
      }

    } catch (error) {
      console.log(error)
    }

  };


  
  const handleClick = () => {
    let path = `/signup`;
    navigate(path);
  }
  return (
    <div style={{ height: '1024px', width: '1447px' }}>
      <div style={{ display: 'flex' }}>
        <h1 style={{ marginLeft: '31px', width: '172px', height: '75px', fontFamily: 'Work Sans', fontSize: '64px', fontWeight: '700', lineHeight: '75px', letterSpacing: '-0.02em', color: '#0E0E2C', marginTop: '24px', marginBottom: 0 }}>
          Gyani
        </h1>
        <button onClick={(e) => {e.preventDefault();navigate("/login/email")}} style={{cursor:'pointer', marginLeft: '1058px', width: '113px', height: '48px', marginTop: '37px', border: '1px solid #EFEFFD', background: '#FFFFFF', borderRadius: '8px', color: '#428CFB', padding: '12px 24px' }}>
          SIGN IN
        </button>
      </div>

      <div style={{
        alignItems: 'center',
        justifyContent: 'center', textAlign: 'center',
        marginTop: '184px', height: '75px', width: '828px', marginLeft: '339px'
      }}>
        <h2 style={{ margin: 0, fontFamily: 'Work Sans', fontSize: '40px', fontWeight: '700', lineHeight: '47px', letterSpacing: '-0.02em' }}>
          Create password to start membership
        </h2>
        <h3 style={{ margin: 0, fontFamily: 'Work Sans', fontSize: '24px', fontWeight: '500', lineHeight: '28px', color: '#0E0E2C' }}>
          Just a few more steps and you're finished!
        </h3>
        <h3 style={{ margin: 0, fontFamily: 'Work Sans', fontSize: '24px', fontWeight: '500', lineHeight: '28px', color: '#0E0E2C' }}>
          We hate paperwork, too.
        </h3>
      </div>
      <div style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '8px', marginTop: '28px' }}>
        <form method="POST" onSubmit={handleSubmit}>
          <div style={{ marginLeft: '423px', display: 'flex', flexDirection: 'column', alignItems: 'flexstart' }}>
            <input type="email" name="email" defaultValue={email} placeholder="EMAIL ADDRESS" style={{ width: '659px', border: 'none', marginLeft: 0, height: '48px', marginTop: '22px', borderRadius: '8px', backgroundColor: '#ECF1F4', boxShadow: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 0 }}>
            </input>
            <input type="password" name="password" placeholder="PASSWORD" style={{ width: '659px', marginTop: '22px', border: 'none', marginLeft: 0, height: '48px', borderRadius: '8px', backgroundColor: '#ECF1F4', boxShadow: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 0 }}>
            </input>
          </div>
          <div style={{ marginLeft: '423px', display: 'flex', width: '659px', flexDirection: 'column', alignItems: 'flexstart', border: 'none', height: '99px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} >
            <input type="submit" value="NEXT" style={{ marginTop: '8px', height: '48px', width: '170px', borderRadius: '8px', backgroundColor: '#428CFB', color: '#FFFFFF', border: 'none', fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '700', lineHeight: '19px', color: '#FFFFFF', letterSpacing: '0.04em' }} />


          </div>
        </form>

      </div>

    </div>
  )
}

export default Login_3
