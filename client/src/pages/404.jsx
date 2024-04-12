import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import { useAuth } from "../provider/AuthContext";


export const Four0four = () => {
    const {token} = useAuth();
    if(token){
        return (
            <div className="error-container">
                <div className="error-template">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <div className="error-actions">
                        <Link to="/profile" className="btn btn-primary btn-lg">
                            <span className="glyphicon glyphicon-home"></span>
                            Go Back to Profile
                        </Link>
                    </div>
                </div>
            </div>
        );
    }else{
        return (
            <div className="error-container">
                <div className="error-template">
                    <h1>404</h1>
                    <h2>Page Not Found</h2>
                    <div className="error-actions">
                        <Link to="/" className="btn btn-primary btn-lg">
                            <span className="glyphicon glyphicon-home"></span>
                            Go Back to Landing Page 
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
};