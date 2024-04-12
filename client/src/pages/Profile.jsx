import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../provider/AuthContext';

function validateFirstname(firstname) {

}
function validateLastname(lastname) {

}
function validateLocation(address1) {
    return (/^$/.test(address1) && address1.length() <= 100 && address1.length() !== 0) ? true : false;
}
function validateZipcode(zipcode) {

}

export const InputAttribute = ({ title, set, type, placeholder, max, min, pattern }) => {
    return (
        <div className='form-field'>
            <h2 className="input-title">{title}</h2>
            <input className='input-field' type={type} placeholder = {placeholder} maxLength={max} onChange={(e) => set(e.target.value)} />
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
    const fullname = firstname + " " + lastname;
    const navigate = useNavigate();
    
    const { clientInfo } = useAuth();
    const username = clientInfo.username;

    //

    const profile = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/profile', {
                fullname: fullname,
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zipcode: zipcode,
                username: username
            });
            //make sure it navigates to quote
            navigate('/quote');
            console.log(response);
        } catch (error) {
            console.error('Profile save error:', error.response || error);
        }
    }
    
    return (
        <div>
            <h1 className="profile-title" >PROFILE</h1>
            <hr className="mt-5 border-black w-10/12 ml-24" />
            <div className='profile-container'>
                <form className="form-group" onSubmit={profile}>
                    <InputAttribute
                        title="First Name"
                        set={setfirstname}
                        type="text"
                        placeholder="first name"
                        max="25"
                    />
                    <InputAttribute
                        title="Last Name"
                        set={setlastname}
                        type="text"
                        placeholder="last name"
                        max="25"
                    />
                    <InputAttribute
                        title="Address 1"
                        set={setaddress1}
                        type="text"
                        placeholder="address 1"
                        max="100"
                    />
                    <InputAttribute
                        title="Address 2 (optional)"
                        set={setaddress2}
                        type="text"
                        placeholder="address 2"
                        max="100"
                    />
                    <InputAttribute
                        title="City"
                        set={setcity}
                        type="text"
                        placeholder="city"
                        max="100"
                    />
                    <div className="form-field">
                    <h2 className="input-title">State</h2>
                        <select className="input-field-state" required onChange={(e) => setstate(e.target.value)}>
                            <option value="">Select a state</option>
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
                        set={setzipcode}
                        type="text"
                        placeholder="zip code"
                        max="9"
                        min="5"
                        pattern="\d*"
                    />
                    <button className="submit-button">save</button>
                </form>
                <div className='discover-items'>
                    <h3 className='discover-text'>Discover more</h3>
                    <DiscoverAttribute title="Generate Quote" link="/quote" />
                    <DiscoverAttribute title="View Quote History" link="/history"/>
                    <DiscoverAttribute title="Logout"/>
                </div>
            </div>
        </div>
    );
};
