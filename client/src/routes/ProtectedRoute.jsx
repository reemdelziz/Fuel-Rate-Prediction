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
            // If there's no token, navigate to login
            navigate('/login');
        } else if (token && clientInfo.newUser) {
            // If it's a new user, navigate to profile
            navigate('/quote');
        }
        // This effect should only run when the token or clientInfo changes
    }, [token, clientInfo, navigate]);

    // If a new user tries to access a route other than "/profile", return null or a redirect to "/profile"
    if (token && clientInfo.newUser && window.location.pathname !== '/profile') {
        return <Navigate to="/profile" replace />;
    }

    // Otherwise, render child routes
    return <Outlet />;
};
