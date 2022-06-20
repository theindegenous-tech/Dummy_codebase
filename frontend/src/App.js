import * as React from 'react';
import axios from 'axios';
import { Auth } from './components/authentication/auth'
export default function App() {


    const [login, loginPressed] = React.useState(true)
    React.useEffect(() => {
        const getUser = async () => {
            let data = await axios({
                method: 'get',
                url: 'http://localhost:8000/user/',
            });

            console.log(data)
            loginPressed(false)
        }
        if(login){
            getUser()
        }

    }, [login])


    return (
        <div>
            <Auth option={1} loginPressed={loginPressed} />
        </div>
    )

}