import { Globe } from "./Globe";
import { useAuth } from '../provider/AuthContext';
import { Link } from "react-router-dom";

export const NavigatePages = () => {
    const {clientInfo} = useAuth();
    const isnewuser = clientInfo.newUser;
    return (
        <>
            <div className="globe-navigate">
                <Globe />
                <div className="navigate">
                    {isnewuser && (
                        <p className="text-center mb-11 text-white">Navigate to and fill out profile to access to quote form and quote history.</p>
                    )}
                    <div className="navigate-text">
                        <Link to ='/profile'>
                            <h1 className="navigate-title mb-6">PROFILE</h1>
                        </Link>
                        <Link to ={!isnewuser && '/history'} className={`${isnewuser ? "pointer-events-none	" : "pointer-events-auto"}`}>
                            <h1 className={`${isnewuser ? "navigate-title-cross" : "navigate-title"}`} >HISTORY</h1>
                        </Link>
                        <Link to ={!isnewuser && '/quote'} className={`${isnewuser ? "pointer-events-none	" : "pointer-events-auto"}`}>
                            <h1 className={`${isnewuser ? "navigate-title-cross" : "navigate-title"}`}>QUOTE</h1>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    );
};