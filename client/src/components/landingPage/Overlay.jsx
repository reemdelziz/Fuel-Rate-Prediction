import { useProgress } from '@react-three/drei';
import { usePlay } from "../../utils/Play";
import { Navbar } from '../UIcomponets/Navbar';
import { Link } from 'react-router-dom';
import './overlay.css';

export const Overlay = () => {
    const { progress } = useProgress();
    const { play, end, setPlay, hasScroll } = usePlay();
    
    return (
        <div className={`loading-overlay ${play ? "loading-overlay-disable" : ""}`}>
            <div
                className={`loader-overlay ${progress === 100 ? "loader-overlay-disappear" : ""}`}
            />
            {progress === 100 && (
                <div className={`loading-intro ${play ? "loading-intro-disappear" : ""}`}>
                    <h1 className="loading-logo">FUEL PREDICTOR</h1>
                    <div className={`${!hasScroll && !play ? "hide-scroll-message" : ""}`}>
                        <p className={`${!hasScroll && play ? "loding-overlay-notScrolled" : "loading-overlay-scrolled"}`}>Scroll or toggle to being your journey with Fuel Predictor</p>
                    </div>
                    <button className="loading-explore"onClick={() => { setPlay(true);}} >
                        Get Started
                    </button>
                    <Navbar />
                    
                </div>
            )}
            <div className={`loader-outro ${end ? "loader-outro-appear" : ""}`}>
                <h1>Begin your journey with Fuel Predictor</h1>
                <ul className='menu-outro'>
                    <Link to ='/userEntry'><p className='menu-outro-item'>Login</p></Link>
                    <Link to ='/userEntry'><p className="menu-outro-item" >Register</p></Link>
                </ul>
            </div>
            
        </div>
    );
};