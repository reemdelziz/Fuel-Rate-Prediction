import React  from 'react';
import Nav from '../components/Nav';


//create funtion print
function FuelQuote() {
    return (
        <div>
            {/*include nav bar*/}
            


            <div className = "PageTitle" >Fuel Quote.</div>
            

            <div class="container">
                <form className="form-group">
                    <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="GallonsRequested">Gallons Requested*</label>
                        <input type="number" id="GallonsRequested" className="input-field" required/>
                    </div>
                    <div className="form-field">
                        <label htmlFor="DeliveryAddress">Delivery Address*</label>
                        <input type="text" id="DeliveryAddress" className="input-field" placeholder='Non-Editable'readOnly/>
                    </div>
                    </div>

                    <div className="form-row">
                    <div className="form-field">
                        <label htmlFor="DeliveryDate">Delivery Date*</label>
                        <input type="date" id="DeliveryDate" className="input-field" required/>
                    </div>
                    <div className="form-field">
                        <input type="submit" value="Submit" className="submit-button" />
                    </div>
                    </div>
                </form>

                <div className='profileMessage'>
                    When requesting a fuel quote, each estimate is carefully calculated to offer you the best possible price based on current market conditions and your specific requirements. Our aim is to ensure that you receive a competitive and fair quote, helping you manage your fuel expenses efficiently and effectively.
                </div>
                </div>

                <div class="price-amount-labels">
                    <div class="SuggestedPrice-label">
                        <span>Suggested Price / Gallon:</span>
                    </div>
                    <div class="TotalAmount-label">
                        <span>Total Amount Due:</span>
                    </div>
                    </div>

                    <div class="price-amount-values">
                    <div class="SuggestedPrice-value">
                        <span id="suggestedPriceValue">$0.00</span> 
                    </div>
                    <div class="TotalAmount-value">
                        <span id="totalAmountDueValue">$0.00</span> 
                    </div>

                </div>

            </div>
  
       
    );


}
export default FuelQuote;
