import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../provider/AuthContext";
import { Profile } from "../pages/Profile";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";



export const ProtectedRoute = () => {
    const { token, clientInfo } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else if (token && clientInfo.newUser) {
            navigate('/profile');
        }
        // This effect should only run when the token or clientInfo changes
    }, [token, clientInfo, navigate]);

    // Render Outlet to render child routes if the conditions above are not met
    return <Outlet />;
};