import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import { FullScreenOverlay } from "../../utils/FullScreenOverlay";
import { usePlay } from "../landingPage/UIexperience/Play";


/*WHEN NOT LOGGED IN!!!!!!!*/
/*
function Nav() {
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

                
        
            
                <nav className="NavBar">
                    <div className="brandlogo">PREDICT <br />FUEL.</div>

                        <div className = "navigationTab_box">
                            


                            <Link to = "/home" className="Navsearchstyle">Home<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>01</span></Link>
                            <Link to= "/LoginForm" className="Navsearchstyle" ">Login<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>02</span></Link>
                            <Link = "/RegisterForm" className="Navsearchstyle" >Register<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>03</span></Link>
                        </div>
                        <div></div>
                        <div className="timeNDate">
                            <p>{formattedDate}</p>
                            <p>{formattedTime}</p>
                            
                        </div>
                    <div></div>
                    

                </nav>

           
            
        
        
        
        
     );
}

export default Nav;
*/




/*WHEN LOGGED IN!!!!!!*/
export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { play, setToggled, toggle} = usePlay();

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
        <nav className={`nav-component ${play ? 'navbar-disabled' : ''}`}>
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

