import React, { useEffect, useState } from "react";
import { usePlay } from "../../utils/Play";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

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
    const [time,setTime] = useState(new Date())

    useEffect(() => {
        const intervalId = setInterval(() => setTime(new Date()), 1000);
        
        return () => clearInterval(intervalId);
    }, []);
    
    const formattedDate = time.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const formattedTime = time.toLocaleTimeString('en-US', { timeStyle: 'short' }) + ' CST';
    return (
        <>
            {updateNav && (
                <nav className=" z-10 flex justify-between w-full px-8 py-2 top-4">
                    <h1 className="navbar-title">FUEL<br></br>PREDICTOR.</h1>
                    <div className="navbar-list">
                        <Link to='/register' className="navbar-item">REGISTER</Link>
                        <Link to='/login' className="navbar-item">LOGIN</Link>
                    </div>
                    <button className="navbar-button" onClick={handleExperienceButtonClick}>
                        Experience
                    </button>
                </nav>

            )}{!updateNav && play && (
                <nav className="nav-componet">
                    <div className="other-componets">
                        <Link to='/register' >
                            <button className="register-bttn">
                                Register
                            </button>
                        </Link>
                        <Link to ='/login'>
                            <button className="login-bttn">
                                Login
                            </button>
                        </Link>
                    </div>
                    <div className="hamburger-component">
                        <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                            <div className="burger burger1"></div>
                            <div className="burger burger2"></div>
                        </div>
                    </div>
                    {isOpen && (
                        <>
                            <div className="overlay">
                                <ul className="menu">
                                    <Link to='/register'><p className="burger-menu-item" style={{ '--animation-delay': '.5s' }}>Register</p></Link>
                                    <Link to='/login'><p className="burger-menu-item" style={{ '--animation-delay': '1s' }}>Login</p></Link>
                                    <li className="BugertimeNDate" style={{ '--animation-delay': '2s' }}>
                                        <p className="text-date">{formattedDate}</p>
                                        <p className="text-date">{formattedTime}</p>

                                    </li>
                                </ul>
                            </div>
                        </>
                    )}
                </nav>
            )}

        </>
    );
};

