// include Nav.jsx

import React  from 'react';
import Nav from '../components/Nav';

//create funtion print
function Profile() {
    //return Nav
    return (
        <div>
            {/*include nav bar*/}
            <Nav />

            <div className = "PageTitle" >Client Profile Management</div>
            

            <div class="container">
                <form className="form-group">
                    <div className="form-row">
                        <div className="form-field">
                        <label htmlFor="firstName">First Name*</label>
                        <input type="text" id="firstName" className="input-field" />
                        </div>
                        <div className="form-field">
                        <label htmlFor="lastName">Last Name*</label>
                        <input type="text" id="lastName" className="input-field" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                        <label htmlFor="address1">Address 1*</label>
                        <input type="text" id="address1" className="input-field" />
                        </div>
                        <div className="form-field">
                        <label htmlFor="address2">Address 2 (optional)</label>
                        <input type="text" id="address2" className="input-field" />
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                        <label htmlFor="city">City*</label>
                        <input type="text" id="city" className="input-field" />
                        </div>
                        <div className="form-field">
                        <label htmlFor="state">State*</label>
                        <select id="state" className="input-field">
                            <option value="">Select a state</option>
                        </select>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                        <label htmlFor="zipCode">Zip Code*</label>
                        <input type="text" id="zipCode" className="input-field" />
                        </div>
                        <div className="form-field">
                        <input type="submit" value="Submit" className="submit-button" />
                        </div>
                    </div>
                </form>
                <div className='profileMessage'>
                    Please note that completing or updating your profile information may impact the accuracy of your personalized fuel rate predictions. Ensuring your details are current helps us tailor our services to your needs effectively.
                </div>
            </div>


            
            
        
        </div>
    );
}
export default Profile;
