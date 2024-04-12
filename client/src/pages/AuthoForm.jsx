import React, { useState, useEffect } from "react";
import axios from "axios";
import blindeye from '../assets/images/eye-crossed.png';
import eye from '../assets/images/eye.png';
import userImg from '../assets/images/user.png';
import lock from '../assets/images/padlock.png';
import { useAuth } from "../provider/AuthContext";
import { useNavigate } from "react-router-dom";
import '../style.css';

function validateUserName(userName) {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (userName.length === 0) {//check length
        return false;
    }
    if (!regex.test(userName)) { //check if email
        return false;
    }
    return true;
};

function validatePassword(password) {
    if (password.length === 0 || password.length < 8) {//check length
        return false;
    } else if (!/[A-Z]/.test(password)) { //check for uppercase letter
        return false;
    } else if (!/[a-z]/.test(password)) { //check for lowercase letter
        return false;
    } else if (!/[0-9]/.test(password)) { //check for a num
        return false;
    } else if (!/[\W_]/.test(password)) { //check special characters
        return false;
    } else if (/\s/.test(password)) { //check spaces
        return false;
    }
    return true;
};

export const AuthoForm = ({ title, text }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setvisible] = useState(false);
    const [disableBttn, setDisableBttn] = useState(true);
    const navigate = useNavigate();
    const { setToken, clientInfo, setClient} = useAuth();

    useEffect(() => {
        if (validateUserName(username) && validatePassword(password)) {
            setDisableBttn(false);
        } else {
            setDisableBttn(true);
        }
    }, [username, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (title === 'Register') {
                const response = await axios.post('http://localhost:8080/register', {
                    username: username,
                    password: password,
                });
                window.location.href = '/login';
            } else if (title === 'Login') {
                const response = await axios.post('http://localhost:8080/login', {
                    username: username,
                    password: password,
                });
                const token = response.data.token;
                const isOldUser = response.data.result[0].oldUser === 1;
                
                setToken(token);
                setClient({ username: username, newUser: !isOldUser });
    
                if (isOldUser) {
                    navigate('/quote'); // User has filled out the profile
                } else {
                    navigate('/profile'); // User needs to fill out the profile
                }
            }
        } catch (error) {
            console.error('Error:', error.response || error);
        }
    };

    return (
        <div className='userentry-container'>
            <div className='userentry-column'>
                <div className="userentry">
                    <h1 className="text-6xl	my-6">{title}</h1>
                    <p className="w-1/2 text-base m-auto">{text}</p>
                    <form onSubmit={handleSubmit}>
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
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                    <div style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)' }}>
                                        <img className='h-5 w-5' src={userImg} alt="user" />
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
                                        type={visible ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <div style={{ position: 'absolute', left: '0', top: '50%', transform: 'translateY(-50%)' }}>
                                        <img className='h-5 w-5' src={lock} alt="lock" />
                                    </div>
                                    <div style={{ position: 'absolute', right: '0', top: '50%', transform: 'translateY(-50%)' }} onClick={() => { setvisible(!visible) }}>
                                        {visible ? <img className='h-5 w-5 mr-4' src={eye} alt='view' /> : <img className='h-5 w-5 mr-4' src={blindeye} alt="hidden" />}
                                    </div>
                                </div>
                                <div style={{ width: '20em', border: '.5px black solid', borderRadius: '10px' }}></div>
                            </div>
                        </section>

                        <button className="submit-button" disabled={disableBttn} >submit</button>
                    </form>
                </div>
            </div>

        </div>
    )
};