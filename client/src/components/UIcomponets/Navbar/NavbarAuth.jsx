import { useAuth } from "../../../provider/AuthContext";
import { Link } from "react-router-dom";

const navigationNotAuth = [
    { element: <Link to = '/register' className="navbar-item">REGISTER </Link> },
    { element: <Link to ='/login' className="navbar-item">LOGIN </Link> },
    //button here 
];
const navigationAuth = [
    { title: "History", element: <Link to = '/history' className="navbar-item">HISTROY</Link> },
    { title: "Quote", element: <Link to = '/quote' className="navbar-item">QUOTE</Link> },
    //buton here
];

export const NavigationAttriubtes = ({navprops}) => {
    return(
        <div className="navbar-list">
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
