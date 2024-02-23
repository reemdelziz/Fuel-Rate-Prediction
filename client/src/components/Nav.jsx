import React, {useEffect,useState} from "react";
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
                            


                            <a className="Navsearchstyle" href="/#">Home<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>01</span></a>
                            <a className="Navsearchstyle" href="/#">Login<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>02</span></a>
                            <a className="Navsearchstyle" href="/#">Register<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>03</span></a>
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
export const Nav = () => {
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
                    <a className="Navsearchstyle" href="/#">Fuel Quote<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>01</span></a>
                    <a className="Navsearchstyle" href="/#">History<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>02</span></a>
                    <a className="Navsearchstyle" href="/#">Profile<span style={{fontSize: '16px', verticalAlign: 'sub',lineHeight: '1', }}>03</span></a>
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
            <ul className="menu">
                <li className="burger-menu-item" style={{ '--animation-delay': '0s' }}>Fuel Quote</li>
                <li className="burger-menu-item" style={{ '--animation-delay': '0.5s' }}>History</li>
                <li className="burger-menu-item" style={{ '--animation-delay': '1s' }}>Profile</li>
                <li className="burger-menu-item" style={{ '--animation-delay': '1.5s' }}>Logout</li>
                <li className="BugertimeNDate" style={{ '--animation-delay': '2s' }}>
                            <p>{formattedDate}</p>
                            <p>{formattedTime}</p>
                            
                </li>
            </ul>
        </div>
    );
};

export default Nav;
