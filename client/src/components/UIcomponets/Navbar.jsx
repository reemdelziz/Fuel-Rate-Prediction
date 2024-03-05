import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { FullScreenOverlay } from "./FullScreenOverlay";
import { usePlay } from "../../utils/Play";

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { play, end, setToggled} = usePlay();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };
    
    if(isOpen){
        setToggled(true);
    } else{
        setToggled(false);
    }
    
    
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
        <nav className={`nav-component ${(play && !end) ? 'navbar-disabled' : ''}`}>
                <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="burger burger1"></div>
                    <div className="burger burger2"></div>
                </div>
                {isOpen && (
                    <FullScreenOverlay />
                )}
        </nav>        
     );
};

