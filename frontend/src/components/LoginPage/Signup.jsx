import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/AuthContext";
import axios from "axios";
import "./Signup.css";
import { Navigate, useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import MuiAlert from '@mui/material/Alert';
import { ReactComponent as ReactLogo } from "./login.svg";



const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});



function Signup() {
  // React States
  const [signup, setSignup] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [open_suc, setopen_suc] = React.useState(false);

  const { state } = useLocation()
  // const { email } = state 


  let { user, setUser } = useContext(UserContext); 
  const handleSubmit = async (e) => {

    //Prevent page reload
    e.preventDefault();

    var { firstname,lastname,email, password } = document.forms[0];
    try {
      console.log("firstname.value",firstname.value)
      console.log("firstname.value",lastname.value)
      console.log("firstname.value",email.value)
      console.log("firstname.value",password.value)
     let signedupUserDetails= await axios({
        method: 'post',
        url: 'http://64.227.182.173:8000/signup/',
        data: {
          first_name:firstname.value,
          last_name:lastname.value,
          email: email.value,
          password: password.value
        },
        // withCredentials: true
      });
      console.log("signedupUserDetails",signedupUserDetails)
      setSignup({email:signedupUserDetails.data.email,password:password.value});
      setUser(signedupUserDetails.data)
    } catch (error) {
      console.log(error)
    }
    
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    // setUser(userDetails.data)
    setOpen(false);
  };
  const handleClose_success = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    open_suc(false);
  };

  const vertical = 'top';
  const horizontal = 'right'


  useEffect(() => {

    const loginuser = async () => {
      try {
        let userDetails= await axios({
          method: 'post',
          url: 'http://64.227.182.173:8000/login/',
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

    <>
    <div style={{ height: '1024px', width: '1447px' }}>
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
        marginTop: '54px', height: '75px', width: '828px', marginLeft: '339px'
      }}>
        <h2 style={{ margin: 0, fontFamily: 'Work Sans', fontSize: '40px', fontWeight: '700', lineHeight: '47px', letterSpacing: '-0.02em' }}>
          Can't wait to onboard you!
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
            <input type="text" name="firstname"  placeholder="First Name" style={{ width: '659px', border: 'none', marginLeft: 0, height: '48px', marginTop: '22px', borderRadius: '8px', backgroundColor: '#ECF1F4', boxShadow: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 0 }}>
            </input>
            <input type="text" name="lastname" placeholder="Last Name" style={{ width: '659px', marginTop: '22px', border: 'none', marginLeft: 0, height: '48px', borderRadius: '8px', backgroundColor: '#ECF1F4', boxShadow: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 0 }}>
            </input>
            <input type="email" name="email"  placeholder="EMAIL ADDRESS" style={{ width: '659px', border: 'none', marginLeft: 0, height: '48px', marginTop: '22px', borderRadius: '8px', backgroundColor: '#ECF1F4', boxShadow: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 0 }}>
            </input>
            <input type="password" name="password" placeholder="PASSWORD" style={{ width: '659px', marginTop: '22px', border: 'none', marginLeft: 0, height: '48px', borderRadius: '8px', backgroundColor: '#ECF1F4', boxShadow: 'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)', flex: 'none', order: 1, alignSelf: 'stretch', flexGrow: 0 }}>
            </input>
          </div>
          <div style={{ marginLeft: '423px', display: 'flex', width: '659px', flexDirection: 'column', alignItems: 'flexstart', border: 'none', height: '99px', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} >

            <button style={{ marginTop: '8px', height: '48px', width: '170px', borderRadius: '8px', backgroundColor: '#428CFB', color: '#FFFFFF', border: 'none', fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '700', lineHeight: '19px', color: '#FFFFFF', letterSpacing: '0.04em' , cursor:'pointer'}}  type="submit" onClick={handleSubmit}>
       Submit</button>
       {/* <Button >Open simple snackbar</Button> */}
 <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
        <Alert  severity="error" onClose={handleClose}  sx={{ width: '100%' }}>
      Something went wrong
        </Alert>
      </Snackbar>
 <Snackbar open={open_suc} autoHideDuration={6000} onClose={handleClose_success}  anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
        <Alert  severity="success" onClose={handleClose}  sx={{ width: '100%' }}>
      Login Success
        </Alert>
      </Snackbar>

          </div>
        </form>

      </div>
      <div className="container">

<ReactLogo />
  </div>

    </div>
{/* <div className="app">
      
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

     </div> */}
    </>
  );
}

export default Signup;
