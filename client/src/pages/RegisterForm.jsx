import { React, useState } from "react";
import Axios from "axios";
import blindeye  from '../assets/images/eye-crossed.png';
import eye  from '../assets/images/eye.png';
import '../style.css';

function validateUserName (userName){
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    const uppCaseRegex = /[A-Z]/;
    const lowerCaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[\W_]/;
    const spaceRegex = /\s/;

    if(userName.length < 8){
        
    }
    
    return true;
};
function validatePassword(password){
    return true;
}
export const RegisterForm = () => {
    const [username, setusername] = useState("");
    const [password, setuserpassword] = useState("");
    const [errorUsername, seterrorUsername] = useState("");
    const [errorPassword, seterrorPassword] = useState ("");
    const [visable, setvisable] = useState(false);

    const [usernameMessage, setusernameMessage] = useState("");

    const handleUsernameMessage = () =>{
        
    }
    
    const register = (event) => {
        event.preventDefault();
        Axios.post('http://localhost:8080/register', {
            username: username,
            password: password,
        }).then((response)=>{
            console.log(response);
            window.location.href = '/login';
        }).catch((error) => {
            console.error(error);
        });
    };

    return (
        <div className='userentry-container'>
            <div className='userentry-column'>
                <div className="userentry">
                    <h1 className="text-6xl	my-6">Register</h1>
                    <p className="w-1/2 text-base m-auto">Ready to predict fuel rates located all around the US? Sign up now to access personalized quotes, hassle-free profile management, and exclusive features. Join us as we pave the way for the future of fuel procurement!</p>

                    <form onSubmit={register}>
                        <section id="fields">
                            <div className="input-box">
                                {validateUserName(username) ? (
                                    <div className="inputLabels">Username</div>
                                ) : (
                                    <div className="inputLabels">Username*</div>
                                )}
                                <input
                                    placeholder="email"
                                    type="text"
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                />
                                <div style={{ width: "20em", border: '1px white solid' }}></div>
                            </div>

                            <div className="input-box">
                                {validatePassword(password) ? (
                                    <div className="inputLabels">Password</div>
                                ) : (
                                    <div className="inputLabels">Password*</div>
                                )}
                                <div className='flex flex-row' style={{ position: 'relative' }}>
                                    <input
                                        placeholder="password"
                                        type={visable ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setuserpassword(e.target.value)}
                                    />
                                    <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }} onClick={() => { setvisable(!visable) }}>
                                        {visable ? <img className='h-5 w-5 mr-4' src={eye} alt='view' /> : <img className='h-5 w-5 mr-4' src={blindeye} alt="hidden" />}
                                    </div>
                                </div>

                                <div style={{ width: '20em', border: '1px white solid' }}></div>
                            </div>
                        </section>


                        <button className={`${validateUserName(username) && validatePassword(password) ? "navbar-button" : "hide-button"}`} >Submit</button>
                        <p></p>
                    </form>
                </div>
            </div>

        </div>
    );
};