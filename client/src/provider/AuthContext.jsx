import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [user, setUser_] = useState(true);
    
    const setToken = (newToken) => {
        setToken_(newToken);
    };

    const setUser = (newUser) => {
        setUser_(newUser);
    };

    useEffect(() => {
        if(token){
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else{
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
        }
    }, [token]);

    const contextValue = useMemo(() => ({
        token,
        setToken,
    }), [token]);

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
