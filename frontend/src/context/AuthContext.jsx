import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(); 
export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    //checking for the authtoken upon the component mount
    useEffect(() => {
        const token = localStorage.getItem('authToken'); 
        setIsAuthenticated(!!token);
    }, [])
    
    //login method
    const login = (token) => {
        localStorage.setItem("authToken", token);
        setIsAuthenticated(true); 
    }

    //logout method
    const logout = () => {
        console.log('Logout function called')
        localStorage.removeItem("authToken"); 
        setIsAuthenticated(false); 
    }
    return(
        <AuthContext.Provider value = {{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
    
}
