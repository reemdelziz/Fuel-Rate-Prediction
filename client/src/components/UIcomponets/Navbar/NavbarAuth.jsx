import { useAuth } from "../../../provider/AuthContext";
import { Link } from "react-router-dom";


const handleButtonOnClickNotAuth = () => {
    window.location = "/";
}
export const NavAuthButton = () => {
    const {clientInfo, setToken} = useAuth();
    const handleLogout = () => {
        setToken(null);
    };
    return (
        <div className="navbttn-dropdown">
            <button className="navbttn-auth">{clientInfo.username}</button>
            <div className="navbttn-content">
                <Link to = '/profile'>Profile</Link>
                <hr className="border-black "/>
                <button className="navbar-logout" onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

const navigationNotAuth = [
    {element: <h1 className="navbar-title">FUEL<br></br>PREDICTOR.</h1> },
    { element: 
        <div className="navbar-list">
            <Link to = '/register' className="navbar-item">REGISTER </Link>
            <Link to ='/login' className="navbar-item">LOGIN </Link>
        </div>},
    { element : <button className="navbar-button" onClick={handleButtonOnClickNotAuth}>Experience</button>}
];

const navigationAuth = [
    {element: <h1 className="navbar-title">FUEL<br></br>PREDICTOR.</h1> },
    {element:
        <div className="navbar-list">
            <Link to = '/profile' className="navbar-item">PROFILE</Link>
            <Link to = '/history' className="navbar-item">HISTROY</Link>
            <Link to = '/quote' className="navbar-item">QUOTE</Link>
        </div>
    },
    { element: <NavAuthButton />}
];

export const NavigationAttriubtes = ({navprops}) => {
    
    return(
        <div className=" z-10 flex justify-between w-screen px-8 py-2 top-4">
            {navprops.map((obj, index) => (
                <div key ={index}>
                    {obj.element}
                </div>
            ))}
        </div>
    );
};

export const NavbarAuth = () => {
    const { token } = useAuth();
    const navigation = token ? navigationAuth : navigationNotAuth;
    return <NavigationAttriubtes navprops={navigation} />
};
