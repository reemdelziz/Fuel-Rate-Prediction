import React, { useState, useEffect } from "react";
import blindeye from '../assets/images/eye-crossed.png';
import eye from '../assets/images/eye.png';
import user from '../assets/images/user.png';
import lock from '../assets/images/padlock.png';
import '../style.css';

function validateUserName(userName) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (userName.length === 0) {//check length
        return false;
    }
    if (!regex.test(userName)){ //check if email
        return false;
    }
    return true;
}

function validatePassword(password) {
    if (password.length === 0 || password.length < 8) {//check length
        return false;
    } else if(!/[A-Z]/.test(password)){ //check for uppercase letter
        return false;
    } else if (!/[a-z]/.test(password)){ //check for lowercase letter
        return false;
    } else if(!/[0-9]/.test(password)){ //check for a num
        return false;
    } else if(!/[\W_]/.test(password)){ //check special characters
        return false;
    } else if(/\s/.test(password)){ //check spaces
        return false;
    }
    return true;
}

export const AuthoForm = ({title, text, onSubmit }) => {
    const [username, setusername] = useState("");
    const [password, setuserpassword] = useState("");
    const [visable, setvisable] = useState(false);
    const [disableBttn, setDisableBttn] = useState(true);

    useEffect(() => {
        if (validateUserName(username) && validatePassword(password)) {
            setDisableBttn(false);
        } else {
            setDisableBttn(true);
        }
    }, [username, password]);

    
    return(
       <div className='userentry-container'>
            <div className='userentry-column'>
                <div className="userentry">
                    <h1 className="text-6xl	my-6">{title}</h1>
                    <p className="w-1/2 text-base m-auto">{text}</p>
                    <form>
                        <section id="fields">
                            <div className="input-box">
                                {validateUserName(username) ? (
                                    <div className="inputLabels">Username</div>
                                ) : (
                                    <div className="inputLabels">Username*</div>
                                )}
                                <div className='flex flex-row' style={{ position: 'relative' }}>
                                    <input
                                        className='userEntry-input'
                                        placeholder="email"
                                        type='text'
                                        value={username}
                                        onChange={(e) => setusername(e.target.value)}
                                    />
                                    <div style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)' }}>
                                        <img className='h-5 w-5' src={user} alt="user"/>
                                    </div>
                                </div>
                                <div style={{ width: "20em", border: '.5px black solid', borderRadius: '10px' }}></div>
                            </div>

                            <div className="input-box">
                                {validatePassword(password) ? (
                                    <div className="inputLabels">Password</div>
                                ) : (
                                    <div className="inputLabels">Password*</div>
                                )}
                                <div className='flex flex-row' style={{ position: 'relative' }}>
                                    <input
                                        className='userEntry-input'
                                        placeholder="password"
                                        type={visable ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setuserpassword(e.target.value)}
                                    />
                                    <div style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)' }}>
                                        <img className='h-5 w-5' src={lock} alt="lock"/>
                                    </div>
                                    <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }} onClick={() => { setvisable(!visable) }}>
                                        {visable ? <img className='h-5 w-5 mr-4' src={eye} alt='view' /> : <img className='h-5 w-5 mr-4' src={blindeye} alt="hidden" />}
                                    </div>
                                </div>
                                <div style={{ width: '20em', border: '.5px black solid', borderRadius: '10px' }}></div>
                            </div>
                        </section>

                        <button className="submit-button" disabled={disableBttn}>Submit</button>
                    </form>
                </div>
            </div>

        </div>
    )
};