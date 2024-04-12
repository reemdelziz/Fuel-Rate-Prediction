import React, { createContext, useState, useEffect, useMemo, useContext } from "react";
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken_] = useState(localStorage.getItem("token"));
    const [clientInfo, setClientInfo_] = useState(() => {
        const savedClientInfo = localStorage.getItem("clientInfo");
        return savedClientInfo ? JSON.parse(savedClientInfo) : {
            username: ''
        };
    });

    const setToken = (newToken) => {
        setToken_(newToken);
    };

    const setClient = (newClientInfo) => {
        console.log('Updating client info with', newClientInfo);
        const updatedClientInfo = {
            ...clientInfo,
            ...newClientInfo // Merge new client info with existing to update it
        };
        localStorage.setItem('clientInfo', JSON.stringify(updatedClientInfo)); // Save updated client info to local storage
        setClientInfo_(updatedClientInfo);
    };

    useEffect(() => {
        if(token){
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else{
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
            localStorage.removeItem('clientInfo');
        }
    }, [token]);

    const contextValue = useMemo(() => ({
        token,
        setToken,
        clientInfo,
        setClient
    }), [token, clientInfo]);

    return(
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
