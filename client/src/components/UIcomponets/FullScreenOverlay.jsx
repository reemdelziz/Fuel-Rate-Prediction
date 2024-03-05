import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { pageTransition } from "../../utils/pageTransition";
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

            <ul className="menu"> {/*modfiy css so that the the content is based on col */}
                <Link to ='/loginForm'><p className="burger-menu-item" style={{ '--animation-delay': '0.5s' }}>Login</p></Link>
                <Link to = '/registerForm'><p className="burger-menu-item" style={{ '--animation-delay': '1s' }}>Register</p></Link>
                <li className="BugertimeNDate" style={{ '--animation-delay': '2s' }}>
                            <p>{formattedDate}</p>
                            <p>{formattedTime}</p>
                            
                </li>
            </ul>
        </div>
    );
};