import { createContext, useEffect , useContext, useState } from "react";
import { getAuth } from "firebase/auth";
import Login from "./comps/Login";
import nookies from 'nookies';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    

    useEffect(() => {
        const auth = getAuth()
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                setCurrentUser(null);
                nookies.set(undefined, "token", "" , {});
                return;
            }
            const token = await user.getIdToken();
            setCurrentUser(user);
            nookies.set(undefined, "token", token, {});
        })
    }, [])
    if (!currentUser) {
        return <Login />
    } else {
        return ( 
            <AuthContext.Provider value={{ currentUser }}>
                {children}
            </AuthContext.Provider>
        )
    } 
}
export const useAuth = () =>  useContext(AuthContext)
 
