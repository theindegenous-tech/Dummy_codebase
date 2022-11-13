import React from "react";
// import { UserContext } from "../context/AuthContext";
import {  useNavigate } from 'react-router-dom'
import { ReactComponent as ReactLogo } from "./login.svg";
function Login4() {
  let navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    
    //Prevent page reload
    e.preventDefault(); 
    let path = `/login/password`; 
    var { email} = document.forms[0];
    navigate(path,{state:{email:email.value}});
     
    
  };


  const handleClick = () => {
    let path = `/signup`;
    navigate(path);
  }
  
  return (
    <div style={{height:'1024px',width:'1447px'}}>
                <div style={{ display: 'flex' ,    justifyContent: 'space-between'}}>
        <h1 style={{ marginLeft: '31px', width: '172px', height: '75px', fontFamily: 'Work Sans', fontSize: '64px', fontWeight: '700', lineHeight: '75px', letterSpacing: '-0.02em', color: '#0E0E2C', marginTop: '24px', marginBottom: 0 ,pointer:'cursor'}}>
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
        alignItems:'center',
       justifyContent:'center',textAlign:'center',
       marginTop:'133px', height:'75px',width:'828px', marginLeft:'339px'}}>
        <h2 style={{margin:0, fontFamily: 'Work Sans',fontSize:'40px',fontWeight:'700',lineHeight:'46.92px', letterSpacing:'-2%'}}>
           Continue setting up your account      
        </h2>
        <h2 style={{margin:0, fontFamily: 'Work Sans',fontSize:'24px',fontWeight:'500',lineHeight:'28px',color:'#0E0E2C'}}>
            We promise it only takes a second.

        </h2>
      </div>
      <div style={{alignItems:'center', justifyContent:'center',textAlign:'center',gap:'8px',marginTop:'28px'}}>
       
          <form method="POST" onSubmit={handleSubmit}> 
          <div style={{marginLeft:'423px',display:'flex',flexDirection:'column',border:'none',height:'78px',alignItems:'center', justifyContent:'center',textAlign:'center'}}>
          <input type="email" name="email" placeholder="EMAIL ADDRESS" style={{width:'659px',border:'none', marginLeft:0, height:'48px', marginTop:'8px',borderRadius:'8px', 
        //   paddingTop:'8px', paddingBottom:'8px',
          backgroundColor:'#ECF1F4', boxShadow:'inset 0px 2px 2px -1px rgba(74, 74, 104, 0.1)',flex:'none',order:1,alignSelf:'stretch',flexGrow:0}}>
        </input>
        </div>
        <div style={{marginLeft:'423px',display:'flex',width:'659px',flexDirection:'column', border:'none',height:'78px',alignItems:'center', justifyContent:'center',textAlign:'center'}} >
            <button style={{cursor:'pointer', marginTop:'8px',height:'48px', width:'170px',borderRadius:'8px', backgroundColor:'#428CFB', color:'#FFFFFF', border:'none',fontFamily: 'Work Sans',fontSize:'16px',fontWeight:'700',lineHeight:'19px',letterSpacing:'0.04em'}}>
          NEXT
        </button>
        </div>
        </form>
      </div>
      <div className="container">

<ReactLogo />
  </div>
       
    </div>
  )
}

export default Login4