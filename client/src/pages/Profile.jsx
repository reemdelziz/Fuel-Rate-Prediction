import { React } from 'react';

//create funtion print
export const Profile = () => {
    //return Nav
    return (
        <div>
            <div className = "PageTitle" >Client Profile Management</div>
            


            <div class="container">
                <form className="form-group">
                    <div className="form-row">
                        <div className="form-field">
                        <label htmlFor="firstName">First Name*</label>
                        <input type="text" id="firstName" className="input-field" required maxLength = "25"/>
                        </div>
                        <div className="form-field">
                        <label htmlFor="lastName">Last Name*</label>
                        <input type="text" id="lastName" className="input-field" required maxLength="25"/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                        <label htmlFor="address1">Address 1*</label>
                        <input type="text" id="address1" className="input-field" required maxLength="100" />
                        </div>
                        <div className="form-field">
                        <label htmlFor="address2">Address 2 (optional)</label>
                        <input type="text" id="address2" className="input-field" required maxLength="100"/>
                        </div>
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                        <label htmlFor="city">City*</label>
                        <input type="text" id="city" className="input-field" required maxLength="100"/>
                        </div>
                        <div className="form-field">
                        <label htmlFor="state">State*</label>

                        <select id="state" className="input-field" required>
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
                    </div>

                    <div className="form-row">
                        <div className="form-field">
                        <label htmlFor="zipCode">Zip Code*</label>
                        <input type="text" id="zipCode" className="input-field" required maxLength="9" minLength="5" pattern="\d*"/>
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
};
