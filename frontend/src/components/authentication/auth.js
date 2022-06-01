// import axios from 'axios';
// import { useEffect, useState } from 'react';


// This is a function that renders the epub 
function Auth({ option }) {
    return (
        <center>
            {option ?
                <div className='Auth'>
                    <label for="username">Username:</label>
                    <input id="username" name="username" />
                    <label for="pwd">Password:</label>
                    <input type="password" id="pwd" name="pwd" />
                </div> :
                <div>
                    <label for="username">Username:</label>
                    <input id="username" name="username" />
                    <label for="username">First Name:</label>
                    <input id="fname" name="fname" />
                    <label for="username">Last Name:</label>
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
