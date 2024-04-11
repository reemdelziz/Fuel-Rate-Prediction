import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthContext";


export const ProtectedRoute = () => {
    const {token} = useAuth();
    if(!token){
        //if not authenticated, redirect to the login page
        return <Navigate to = '/login' />;
    }
    return (
    <>
        <Outlet />
    </>
    );
    
};
