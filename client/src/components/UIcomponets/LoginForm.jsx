import React, { useState } from 'react';
import blindeye  from '../../assets/images/eye-crossed.png';
import eye  from '../../assets/images/eye.png';
import '../../style.css';

//need to valdite these based on if it matches in or DB
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

export const LoginForm = () => {
    const [username, setusername] = useState("");
    const [password, setuserpassword] = useState("");
    const [visable, setvisable] = useState(false);

    
    return (
        <div className='userentry-container'>
            <div className='userentry-column'>
                <div className="userentry">
                    <h1 class="text-6xl	my-6">Login</h1>
                    <p class="w-1/2 text-xl m-auto">Unlock streamlined fuel management with our secure login portal. Access personalized quotes and manage your profile hassle-free. Join us as we revolutionize fuel procurement.</p>

                    <form>
                        <section id="fields">
                            <div className="input-box">
                            {validateUserName(username) ? (
                                <div className="inputLabels">Username</div>
                            ) : (
                                <div className="inputLabels">Username*</div>
                            )}
                                <input
                                    type='text'
                                    value={username}
                                    onChange={(e) => setusername(e.target.value)}
                                />
                                <div style={{ width: "20em", border: '1px white solid', borderRadius: '10px' }}></div>
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
                                    <div style={{ marginLeft: ".2em" }} onClick={()=>{setvisable(!visable)}}>
                                        {visable ? <img className='h-6 w-6' src={eye} alt='view'/> : <img className='h-6 w-6' src={blindeye} alt="hidden"/>}
                                    </div>
                                </div>
                                <div style={{ width: '22em', border: '1px white solid', borderRadius: '10px' }}></div>
                            </div>
                        </section>
                        
                        <button className={`${validateUserName(username) && validatePassword(password) ? "navbar-button" : "hide-button"}`}>Submit</button>
                        
                    </form>
                </div>
            </div>

        </div>
    );
};
