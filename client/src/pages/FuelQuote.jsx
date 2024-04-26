import { React, useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from "../provider/AuthContext";
import axios from 'axios';

export const FuelQuote = () => {
    const {token, clientInfo} = useAuth();
    const username = clientInfo.username;
    const [gallonsRequested, setGallonsRequested] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalpricepergallon,settotalpricepergallon] = useState(0);
    const [prevClient, setPrevClient] = useState(false);
    const [address, setAddress] = useState(''); 
    const [city, setCity] = useState(''); 
    const [state, setState] = useState(''); 
    const [zipcode, setZipcode] = useState(''); 
    const pricePerGallon= 1.5; 
    const CompanyProfitFactor = .1;
    const gallonsRequestedFactor = gallonsRequested > 1000 ? 0.02 : 0.03;
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const address1 = address + ', ' + city + ', ' + state + ' ' + zipcode;
    

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0]; 
    };

    const [deliveryDate, setDeliveryDate] = useState(getTomorrowDate()); 
    
    const getAddress = async (username) => {
        try {
            const res = await axios.get(`http://localhost:8080/fuel/user/${username}`, {
                headers : {
                    "x-access-token" : token,
                }
            });
           
            setAddress(res.data.userProfile.data.address1); // Set address if fetched
            setCity(res.data.userProfile.data.city); // Set city if fetched
            setState(res.data.userProfile.data.state); // Set state if fetched
            setZipcode(res.data.userProfile.data.zipcode); // Set zipcode if fetched
            let previousclient = res.data.userProfile.data.prevClient === 0 ? false : true;
            setPrevClient(previousclient);

        } catch (error) {
            console.error('Error:', error);
        }
    }
    

    useEffect(() => {
        if (username) {
            getAddress(username);
        }
    }, [username]); 
    
    const isDeliveryWithin7Days = (deliveryDate) => {
        const today = new Date();
        const delivery = new Date(deliveryDate);
        const timeDiff = delivery - today;
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
        return dayDiff <= 7;
    };

    const handleGallonsChange = (event) => {
        const gallons = event.target.value;
        setGallonsRequested(gallons);
        const calculatedTotal = gallons * pricePerGallon;
        setTotalPrice(calculatedTotal);
    };
    const handleDeliveryDateChange = (event) => {
        const newDeliveryDate = event.target.value;
        setDeliveryDate(newDeliveryDate);
    };
    
    
    useEffect(() => {
        if (pricePerGallon && gallonsRequested && deliveryDate) {
            const margin = pricePerGallon * ((state === "TX" ? .02 : .04 ) - (prevClient ? 0.01 : 0) + gallonsRequestedFactor + CompanyProfitFactor);
            const calculatedTotal = gallonsRequested * (1.5 + margin);
            settotalpricepergallon(margin + pricePerGallon);
            setTotalPrice(calculatedTotal);
        }
    }, [pricePerGallon, gallonsRequested, deliveryDate]);


    const DeliveryFeeNotice = () => {
        if (isDeliveryWithin7Days(deliveryDate)) {
            return (
                <p className="delivery-fee-notice">
                    If you order within 7 days from today, each gallon will have an additional fee of $0.15.
                </p>
            );
        } else {
            return (
                <p className="delivery-fee-notice">
                </p>
            );
        }
    };

    const handleSubmit =  async (event) => { 
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/fuel/post/quote`, {
                location: address1,
                gallons: gallonsRequested,
                price_per_gallon: pricePerGallon.toFixed(2),
                delivery_date: deliveryDate,
                total_price: totalPrice.toFixed(2),
                profit_margin: CompanyProfitFactor,
                username: username,
            }, {
                headers : {
                    "x-access-token": token,
                }
            });

            if(!prevClient){
                const updatePrevClientRes = await axios.put(`http://localhost:8080/fuel/put/client`, {
                    prevClient: 1,
                    username: username
                }, {
                    headers : {
                        "x-access-token": token,
                    }
                });
                console.log(updatePrevClientRes);
            }

            console.log(response);
            setShowSuccessMessage(true);

            setGallonsRequested('');
            setDeliveryDate(getTomorrowDate());
            // Optionally, set a timeout to hide the message after a few seconds
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 3000);
        } catch (error) {
            setShowSuccessMessage(false);
            console.error('Quote save error:', error.response || error);
        }
    }

    return (
        <div className="fuelHistory-wrapper">
            <div className="history-header">
                <h1 className="fuel-history-title">FUEL<br />QUOTE</h1>
                <form onSubmit={handleSubmit} className="quote-form">
                    <div className="quote-container">
                        <input
                            type="number"
                            id="GallonsRequested"
                            className="history-filter-bttn"
                            placeholder="Gallons Requested*"
                            value={gallonsRequested}
                            onChange={handleGallonsChange}
                            min="1"
                            required 
                        />
                        <input
                            type="text"
                            id="DeliveryAddress"
                            className="history-filter-bttn"
                            placeholder={address1 || "Delivery Address"}
                            readOnly 
                        />
                    </div>
                    <div className="quote-container">
                        <input
                            type="date"
                            id="DeliveryDate"
                            className="history-filter-bttn"
                            value={deliveryDate}
                            onChange={handleDeliveryDateChange}
                            min={getTomorrowDate()}     
                            required
                        />
                        <input
                            type="submit"
                            value= "Submit Quote"
                            className="history-filter-bttn"
                        />
                    </div>
                </form>
                {showSuccessMessage && (
                    <div className="success-message">
                        Quote has been saved!
                    </div>
                )}
            </div>
            <hr className="mt-10 border-black" />

            <div className="price-boxes">
                <div className="price-box">
                    <div className="price-title">Price per Gallon</div>
                    <div className="price-value">
                        ${totalpricepergallon.toFixed(2)}
                    </div>
                </div>
                <div className="price-box">
                    <div className="price-title">Total Amount Due</div>
                    <div className="price-value">
                        ${totalPrice.toFixed(2)}
                    </div>
                </div>
            </div>
            
        </div>
    );
};