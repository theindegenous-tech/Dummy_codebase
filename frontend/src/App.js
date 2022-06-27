import * as React from 'react';
import axios from 'axios';
import { Auth } from './components/authentication/auth'
export default function App() {


    const [login, loginPressed] = React.useState(true)
    React.useEffect(() => {
        const getUser = async () => {
            console.log("here")
            let res = await axios({
                method: 'get',
                url: 'http://localhost:8000/user/',
                withCredentials: true
            });

            console.log(res.data)
        }
        if(login){
            
            getUser()
            loginPressed(false)
        }

    }, [login])


    return (
        <div>
            <Auth option={1} loginPressed={loginPressed} />
        </div>
    )

}