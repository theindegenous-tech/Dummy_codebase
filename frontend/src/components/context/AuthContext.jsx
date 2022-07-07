import { createContext, useState } from 'react';
export const UserContext = createContext(null);


const UserProvider = ({children}) => {
    const [ user, setUser ] = useState(null);
    const [ url, setUrl ] = useState(null);
    return (
        <UserContext.Provider value={{ user, setUser,url,setUrl }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;