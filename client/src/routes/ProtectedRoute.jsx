import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthContext";
import { Profile } from "../pages/Profile";


export const ProtectedRoute = () => {
    const {token, clientInfo} = useAuth();
    
    if(!token){
        return <Navigate to = '/login' />;
    }
    if(token && clientInfo.newUser){
        console.log("client is a new user:", clientInfo.newUser);
        return <Profile />; //we could add some logic here to say need to complete profile before getting a fuel quote or add a cutom page
    } 
    console.log("client is a old user:", clientInfo.newUser);
    return <Outlet />;
    
};
