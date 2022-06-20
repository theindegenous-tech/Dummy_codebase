import axios from 'axios';
// import { useEffect, useState } from 'react';

import { useState } from "react";


// This is a function that renders the epub 
function Auth({ option, loginPressed }) {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleEmailChange = (event) =>{
        setEmail(event.target.value)
    }
    const handlePasswordChange = (event) =>{
        setPassword(event.target.value)
    }
    const handleLogin=async()=>{
        let data = await axios({
            method: 'post',
            url: 'http://localhost:8000/login/',
            data: {
              email: email,
              password: password
            }
          });
          console.log(data)
          loginPressed(true)
    }
    return (
        <center>
            {option ?
                <div className='Auth'>
                    <label for="email">Email:</label>
                    <input id="email" onChange={handleEmailChange} name="email" />
                    <label for="pwd">Password:</label>
                    <input type="password" onChange={handlePasswordChange} id="pwd" name="pwd" />
                    <input onClick={handleLogin} type="button"></input>
                </div> :
                <div>
                    <label for="email">email:</label>
                    <input id="email" name="email" />
                    <label for="fname">First Name:</label>
                    <input id="fname" name="fname" />
                    <label for="lname">Last Name:</label>
                    <input id="lname" name="lname" />
                    <label for="pwd">Password:</label>
                    <input type="password" id="pwd" name="pwd" />
                    <label for="rpwd">Retype Password:</label>
                    <input type="password" id="rpwd" name="rpwd" />
                </div>}
        </center>
    )
}


export { Auth };
