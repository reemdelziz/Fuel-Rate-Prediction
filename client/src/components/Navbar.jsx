import React, {useEffect,useState} from "react";
import { Link } from "react-router-dom";
import "../style.css"

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

    const toggleMenu = () => {
        setIsOpen(!isOpen);
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
        <nav className="NavBar">
            <div className="brandlogo">PREDICT <br />FUEL.</div>
                <div className = "navigationTab_box">
                    <Link to = "/fuelquote" className="Navsearchstyle" >Fuel Quote<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>01</span></Link>
                    <Link to = "/fuelhistory">History<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>02</span></Link>
                    <Link to = "profile">Profile<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>03</span></Link>
                </div>
                <div></div>
                <div className={`hamburger ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="burger burger1"></div>
                    <div className="burger burger2"></div>
                </div>
                {isOpen && <FullScreenOverlay />}
                <div></div>
                    

        </nav>        
     );
};
const FullScreenOverlay = () => {
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
                <Link to = "/fuelquote" className="burger-menu-item" style={{ '--animation-delay': '0s' }}>Fuel Quote</Link>
                <Link to = "/fuelhistory" className="burger-menu-item" style={{ '--animation-delay': '0.5s' }}>History</Link>
                <Link to = "/profile" className="burger-menu-item" style={{ '--animation-delay': '1s' }}>Profile</Link>
                <li className="burger-menu-item" style={{ '--animation-delay': '1.5s' }}>Logout</li>
                <li className="BugertimeNDate" style={{ '--animation-delay': '2s' }}>
                            <p>{formattedDate}</p>
                            <p>{formattedTime}</p>
                            
                </li>
            </ul>
        </div>
    );
};

