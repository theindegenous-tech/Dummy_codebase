import React from 'react'
import axios from 'axios';
import { UserContext } from '../context/AuthContext'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';



function Profile() {
  let {user, setUser} = useContext(UserContext)
  let navigate = useNavigate()
  const handleClick=async()=>{
    try {
      let res = await axios({
        method: 'post',
        url: 'http://localhost:8000/logout/',
        
        withCredentials: true
      });
      if(res.data.message === 'success') {
        setUser(null)
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{display:'flex', width:'100%', height:'300px'}} className="profile">
        <div className="img_div"style={{width:'40%',justifyContent:'center',textAlign:'center'}}>
          <div>
            <img src="https://compote.slate.com/images/a92fef3e-c1db-4cbf-93da-dae90c0b9388.jpeg?width=1200&rect=4395x2930&offset=0x0" style={{width:'200px',height:'200px',marginTop:'10px',borderRadius:'50%'}}/>
          </div>
            <div>
              <button onClick={handleClick}>SignOut</button>
              </div>
            
        </div>
    <div className="form" style={{width:'60%',height:'200px'}}>
            <form method="POST"  >
                <div className="input-container">
                <label>Firstname </label>
                <input type="text" name="fname" required />
                </div>
                <div className="input-container">
                <label>Lastname </label>
                <input type="text" name="lname" required />
                </div>
                <div className="input-container">
                <label>Email </label>
                <input type="email" name="uname" required /> 
                </div>
                <div className="input-container">
                <label>Password </label>
                <input type="password" name="pass" required />
                </div>
                <div className="button-container">
                <button>Update</button>
                </div>
            </form>
        </div>
        
        </div>

  )
}

export default Profile