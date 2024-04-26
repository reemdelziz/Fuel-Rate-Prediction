import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../provider/AuthContext';


export const InputAttribute = ({ title, set, type, placeholder, max, min, pattern, isnewuser }) => {
    return (
        <div className='form-field'>
            <h2 className="input-title">{title}</h2>
            <input className='input-field' type={type} placeholder = {placeholder} maxLength={max} onChange={(e) => set(e.target.value)} required={title !== "Address 2 (optional)" && isnewuser}/>
            <div style={{ width: "13em", border: '.5px black solid', borderRadius: '10px', marginBottom: '1em' }}></div>
        </div>
    );
};
export const DiscoverAttribute = ({title, link }) => {
    return(
        <div className='discover-item'>
            <h1 className='discover-title'>{title}</h1>
            <hr className="mt-5 mb-12 border-black" />
        </div>
        
    );
};

export const Profile = () => {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [address1, setaddress1] = useState("");
    const [address2, setaddress2] = useState("");
    const [city, setcity] = useState("");
    const [state, setstate] = useState("");
    const [zipcode, setzipcode] = useState("");
    const [profilemessage, setprofilemessage] = useState('');

    const [updatefirstname, setupdatefirstname] = useState("");
    const [updatelastname, setupdatesetlastname] = useState("");
    const [updateaddress1, setupdatesetaddress1] = useState("");
    const [updateaddress2, setupdatesetaddress2] = useState("");
    const [updatecity, setupdatesetcity] = useState("");
    const [updatestate, setupdatesetstate] = useState("");
    const [updatezipcode, setupdatesetzipcode] = useState("");

    const updatefullname = updatefirstname + " " + updatelastname;
    const fullname = firstname + " " + lastname;
    const navigate = useNavigate();
    
    const { token, clientInfo, setClient } = useAuth();
    const username = clientInfo.username;
    const isnewuser = clientInfo.newUser;

    const resetUpdateAttribute = () => {
        setupdatefirstname("");
        setupdatesetlastname("");
        setupdatesetaddress1("");
        setupdatesetaddress2("");
        setupdatesetcity("");
        setupdatesetstate("");
        setupdatesetzipcode("");
    }
    const profileq = async (event) => {
        event.preventDefault();
        try {
            if(isnewuser){
                await axios.post('http://localhost:8080/profile', {
                    fullname: fullname,
                    address1: address1,
                    address2: address2,
                    city: city,
                    state: state,
                    zipcode: zipcode,
                    username: username
                }, {
                    headers : {
                        "x-access-token": token,
                    }
                });
                setprofilemessage('Profile saved successfully!');
                setTimeout(() => {
                    setClient({ newUser: false }); 
                    navigate('/navigate');
                }, 3000);
                
            } else{
                const res = await axios.put('http://localhost:8080/profile/update', {
                    fullname: updatefullname,
                    address1: updateaddress1,
                    address2: updateaddress2,
                    city: updatecity,
                    state: updatestate,
                    zipcode: updatezipcode,
                    username: username
                }, {
                    headers : {
                        "x-access-token": token,
                    }
                });
                console.log(res);
                window.location.reload(false); // false parameter ensures the page is reloaded from the cache
            }
            
        } catch (error) {
            console.error('Profile save error:', error.response || error);
        }
    };

    const getUserData = async (username) => {
        try{
            const res = await axios.get(`http://localhost:8080/fuel/user/${username}`, {
                headers : {
                    "x-access-token" : token,
                }
            });
            let fullname = res.data.userProfile.data.fullName;
            const tempFristname = fullname.split(' ')[0];
            const tempLastname = fullname.split(' ')[1];
            setupdatefirstname(tempFristname);
            setupdatesetlastname(tempLastname);
            setupdatesetaddress1(res.data.userProfile.data.address1);
            setupdatesetaddress2(res.data.userProfile.data.address2);
            setupdatesetcity(res.data.userProfile.data.city);
            setupdatesetstate(res.data.userProfile.data.state);
            setupdatesetzipcode(res.data.userProfile.data.zipcode);
            
        } catch(error){

        }
    }

    useEffect(()=> {
        if(!isnewuser)
            getUserData(username);
    }, [username]);

    
    return (
        <div>
            <h1 className="profile-title" >PROFILE</h1>
            {isnewuser ? 
                (<p className="text-center">Complete profile to gain access to other features of application.</p>
            ): (<p className="text-center">
                Edit your profile.
            </p>)}
            <hr className="mt-5 border-white w-10/12 ml-52" />
            <div className='profile-container'>
                <form className="form-group" onSubmit={profileq}>
                    <InputAttribute
                        title="First Name"
                        set={isnewuser ? setfirstname : setupdatefirstname}
                        type="text"
                        placeholder={isnewuser ? "first name" : updatefirstname}
                        max="25"
                        required={isnewuser}
                    />
                    <InputAttribute
                        title="Last Name"
                        set={isnewuser ? setlastname : setupdatesetlastname}
                        type="text"
                        placeholder={isnewuser ? "last name" : updatelastname}
                        max="25"
                        required={isnewuser}
                    />
                    <InputAttribute
                        title="Address 1"
                        set={isnewuser ? setaddress1 : setupdatesetaddress1}
                        type="text"
                        placeholder={isnewuser ? "address 1" : updateaddress1}
                        max="100"
                        required={isnewuser}
                    />
                    <InputAttribute
                        title="Address 2 (optional)"
                        set={isnewuser ? setaddress2 : setupdatesetaddress2}
                        type="text"
                        placeholder={isnewuser ? "address 2" : updateaddress2}
                        max="100"
                        required={isnewuser}
                    />
                    <InputAttribute
                        title="City"
                        set={isnewuser ? setcity : setupdatesetcity}
                        type="text"
                        placeholder={isnewuser ? "city" : updatecity}
                        max="100"
                        required={isnewuser}
                    />
                    <div className="form-field">
                    <h2 className="input-title">State</h2>
                        <select className="input-field-state" onChange={(e) => isnewuser ? setstate(e.target.value) : setupdatesetstate(e.target.value)} required={isnewuser}>
                            <option value="">{isnewuser? "Select a state" : updatestate}</option>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
                    </div>

                    <InputAttribute
                        title="Zip Code"
                        set={isnewuser ? setzipcode : setupdatesetzipcode}
                        type="text"
                        placeholder={isnewuser ? "zip code" : updatezipcode}
                        max="9"
                        min="5"
                        pattern="\d*"
                        required={isnewuser}
                    />
                    <button className="submit-button">save</button>
                </form>
            </div>
            {profilemessage && <p className="profile-message">{profilemessage}</p>}
        </div>
    );
};
