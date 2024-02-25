import { React } from "react";
import "../style.css";

export const RegisterForm = () => {
    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');
    // temp
    const username = '';
    const password = '';

    // const handleLogin = (e) => {
    //   e.preventDefault();
    //   // Add your login logic here (e.g., send a request to a server, check credentials)
    //   console.log('Username:', username);
    //   console.log('Password:', password);
    // };
    return (
        <div className='container'>
            {/* second column includes login form */}
            <div className='column'>

                {/* //Create login form */}
                <div>
                    <h1>Register.</h1>
                    <p className='leftSide'>Ready to predict fuel rates located all around the US? Sign up now to access personalized quotes, hassle-free profile management, and exclusive features. Join us as we pave the way for the future of fuel procurement!</p>

                    <form>
                        <section id="fields">
                            <div id="usernameInput">
                                <div className="inputLabels">Username* </div>
                                <input
                                    type="text"
                                    value={username}
                                // onChange={(e) => setUsername(e.target.value)}
                                />
                                <div style={{ width: '100%', border: '1px black solid' }}></div>
                            </div>

                            <div>
                                <div className="inputLabels">Password* </div>
                                <input
                                    type="text"
                                    value={password}
                                // onChange={(e) => setUsername(e.target.value)}
                                />
                                <div style={{ width: '100%', border: '1px black solid' }}></div>
                            </div>
                        </section>

                        <button type="submit">Submit</button>
                    </form>
                </div>

            </div>
            {/* First column that includes image of car */}
            <div className='column'>
                <img src={car} className="login-car" />
            </div>
        </div>

    );
};