import { React, useState } from "react";
import axios from "axios";
import blindeye  from '../../assets/images/eye-crossed.png';
import eye  from '../../assets/images/eye.png';
import '../../style.css';

function validateUserName(userName) {
    if (userName.length === 0 || userName.length > 30) {
        return false;
    }
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(userName)) {
        return false;
    }
    return true;
}

function validatePassword(password) {
    if (password.length === 0 || password.length > 30) {
        return false;
    }
    return true;
}
export const RegisterForm = () => {
    const [username, setusername] = useState("");
    const [password, setuserpassword] = useState("");
    const [visable, setvisable] = useState(false);

    const register = () => {
        axios.post('http://localhost:8080/register', {
            username: username,
            password: password,
        }).then((response)=>{
            console.log(response);
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

                    <form>
                        <section id="fields">
                            <div className="input-box">
                                {validateUserName(username) ? (
                                    <div className="inputLabels">Username</div>
                                ) : (
                                    <div className="inputLabels">Username*</div>
                                )}
                                <input
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
                                <div className='flex flex-row'>
                                    <input
                                        type={visable ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setuserpassword(e.target.value)}
                                    />
                                    <div style={{ marginLeft: ".2em" }} onClick={() => { setvisable(!visable) }}>
                                        {visable ? <img className='h-6 w-6' src={eye} alt='view' /> : <img className='h-6 w-6' src={blindeye} alt="hidden" />}
                                    </div>
                                </div>

                                <div style={{ width: '22em', border: '1px white solid' }}></div>
                            </div>
                        </section>


                        <button className={`${validateUserName(username) && validatePassword(password) ? "navbar-button" : "hide-button"}`} onClick={register}>Submit</button>
                    </form>
                </div>
            </div>

        </div>
    );
};