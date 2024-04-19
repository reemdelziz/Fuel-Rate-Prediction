import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/AuthContext";
import { ProtectedRoute } from "./ProtectedRoute";

import { LandingPage } from "../pages/LandingPage";
import { RegisterForm } from '../pages/RegisterForm';
import { LoginForm } from "../pages/LoginForm";

import { FuelHistory } from '../pages/FuelHistory';
import { Profile } from '../pages/Profile';
import { FuelQuote } from '../pages/FuelQuote';

import { Navbar } from "../components/UIcomponets/Navbar/Navbar";
import { Four0four } from "../pages/404";
import { NavigatePages } from "../pages/NavigatePages";
export const routesHelper = (path, element) =>{
    return {path, element:(
        <>
            <Navbar/>
            {element}
        </>
    )};
};

export const Routes = () => {
    const { token } = useAuth();

    //routes for unauth clients
    const routesForNotAuth = [
        { path: "/", element: <LandingPage /> },
        routesHelper("/register", <RegisterForm/>),
        routesHelper("/login", <LoginForm/> ),
        { path: '*', element: <Four0four /> } 

    ];

    //protected routes for auth clients
    const routesForAuth = [
        {   
            element: <ProtectedRoute />,
            children: [
                routesHelper("/navigate", <NavigatePages />),
                routesHelper("/history", <FuelHistory />),
                routesHelper("/quote", <FuelQuote />),
                routesHelper("/profile", <Profile />),
                { path: '*', element: <Four0four /> } 
            ],
        }
    ]; 

    const router = createBrowserRouter([
        ...(!token ? routesForNotAuth : []),
        ...routesForAuth,
        
    ]);

    return <RouterProvider router={router} />;
};