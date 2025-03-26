import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(); 
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //checking for the authtoken upon the component mount
    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem('authToken')) //setting auth state to either true or false based on the presence of token in the local storage
    }, [])
    
    //login method
    const login = (token) => {
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true); 
    }

    //logout method
    const logout = () => {
        localStorage.removeItem("authToken"); 
        setIsAuthenticated(false); 
    }
    return(
        <AuthContext.Provider value = {{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
    
}
