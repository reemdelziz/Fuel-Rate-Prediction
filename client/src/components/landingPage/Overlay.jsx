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
                    <Navbar />
                    <h1 className="loading-logo">FUEL PREDICTOR</h1>
                    <p className={`${!play ? 'loading-text-message' : 'loading-text-message-disappear'}`}>Unlock the full potential of the Fuel Predictor tool by taking the first step with your complimentary personalized fuel quote.</p>
                    <div className={`${!play ? "spinner" : ""}`}>
                        <div className={`${!play ? "spinner__image" : "spinner_fadeout"}`}/>
                    </div>
                    <div className={`${!hasScroll && !play ? "hide-scroll-message" : ""}`}>
                        <p className={`${!hasScroll && play ? "loding-overlay-notScrolled" : "loading-overlay-scrolled"}`}>Scroll to being your journey with Fuel Predictor</p>
                    </div>
                    {!play && (<div className="opening-text">
                        <div className='text-container'> 
                            <h2 className='text'>50+ States</h2>
                            <p className='sub-text'>Platform supports across the United States</p>
                        </div>

                        <div className='text-container'>
                            <h2 className='text'>2000+ Companies</h2>
                            <p className='sub-text'>Partnered with over 2000 companies</p>
                        </div>
                        <div className='text-container'>
                            <h2 className='text'>98% Satisfaction</h2>
                            <p className='sub-text'>Customer satisfaction rate</p>
                        </div>
                        
                    </div>)}

                    {!play && (<button className="loading-explore" onClick={() => { setPlay(true);}} >
                        Get Started
                    </button>)}
                    
                    
                </div>
            )}
          
                <div className={`loader-outro ${end ? "loader-outro-appear" : ""}`}>
                <h1 style={{fontFamily:" PowerGrotesk"}}>Begin your journey with Fuel Predictor</h1>
                <ul className='menu-outro'>
                    <Link to ='/register'><p className="menu-outro-item" >Register</p></Link>
                    <Link to ='/login'><p className='menu-outro-item'>Login</p></Link>
                </ul>
            </div>
            
            
            
        </div>
    );
};