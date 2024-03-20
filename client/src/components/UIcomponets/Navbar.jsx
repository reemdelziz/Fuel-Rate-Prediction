import React, { useEffect, useState } from "react";
import { FullScreenOverlay } from "./FullScreenOverlay";
import { usePlay } from "../../utils/Play";
import { useLocation } from "react-router-dom";
import {Link} from "react-router-dom";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [updateNav, setUpdatedNav] = useState(false);
    const { play, end } = usePlay();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const location = useLocation();
    useEffect(() => {
        const updateNavbar = () => {
            setUpdatedNav(location.pathname !== "/");
        };
        updateNavbar();
    }, [location.pathname]);

    const handleExperienceButtonClick = () => {
        window.location = "/";
    };
    
    return (
        <>
            {updateNav && (
               <nav className="fixed z-10 flex justify-between w-full px-8 py-2 top-4">
                    <h1 className="navbar-title">FUEL<br></br>PREDICTOR.</h1>
                    <div className="navbar-list">
                        <Link to='/register' className="navbar-item">REGISTER</Link>
                        <Link to ='/login' className="navbar-item">LOGIN</Link>
                    </div>
                    <button className="navbar-button" onClick={handleExperienceButtonClick}>
                        Experience
                    </button>
               </nav>
                
            )}{!updateNav && (
                <nav className={`nav-component ${(play && !end) ? 'navbar-disabled' : ''}`}>
                    <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                        <div className="burger burger1"></div>
                        <div className="burger burger2"></div>
                    </div>
                    {isOpen && (
                        <FullScreenOverlay />
                    )}
                </nav>
            )}

        </>
    );
};

