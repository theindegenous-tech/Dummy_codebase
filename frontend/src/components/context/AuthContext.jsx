import { createContext, useState, useEffect} from 'react';
export const UserContext = createContext(null);


const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [readingbook, setReadingbook] = useState(null);
    useEffect(() => {
        if (readingbook !== null) {
            window.localStorage.setItem('READING_BOOK_LOCALSTORAGE', JSON.stringify(readingbook));
        }
    }, [readingbook]);
    useEffect(() => {
        if (readingbook === null) {
            const data = window.localStorage.getItem('READING_BOOK_LOCALSTORAGE');
            if (data !== null) setReadingbook(JSON.parse(data));
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser, readingbook, setReadingbook }}>
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider;

