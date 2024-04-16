import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import "../../style.css";

export const FullScreenOverlay = () => {
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
        <div className="overlay">

            <ul className="menu">
                <Link to = '/register'><p className="burger-menu-item" style={{ '--animation-delay': '.5s' }}>Register</p></Link>
                <Link to ='/login'><p className="burger-menu-item" style={{ '--animation-delay': '1s' }}>Login</p></Link>
                <li className="BugertimeNDate" style={{ '--animation-delay': '2s' }}>
                            <p>{formattedDate}</p>
                            <p>{formattedTime}</p>
                            
                </li>
            </ul>
        </div>
    );
};