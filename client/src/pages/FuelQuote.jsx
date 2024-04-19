import { React, useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from "../provider/AuthContext";
import axios from 'axios';

export const FuelQuote = () => {
    const [gallonsRequested, setGallonsRequested] = useState('');
    const [totalPrice, setTotalPrice] = useState(0); 

    const handleGallonsChange = (event) => {
        const gallons = event.target.value;
        setGallonsRequested(gallons);
        const calculatedTotal = gallons * pricePerGallon;
        setTotalPrice(calculatedTotal);
    };

    const {token, clientInfo} = useAuth();
    const username = clientInfo.username;
    const [address, setAddress] = useState(''); 
    const [city, setCity] = useState(''); 
    const [state, setState] = useState(''); 
    const [zipcode, setZipcode] = useState(''); 
    const [pricePerGallon, setPricePerGallon] = useState(2); 
    const ADDITIONAL_FEE = 0.15; 
    const [profit_Margin, setpriceMargin] = useState(2);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const address1 = address + ', ' + city + ', ' + state + ' ' + zipcode;

    const getTomorrowDate = () => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0]; 
    };

    const [deliveryDate, setDeliveryDate] = useState(getTomorrowDate()); 
    

    const getGallonprice = async (state) => {
        try {
            const res = await axios.get(`http://localhost:8080/fuel/state/${state}`, {
                headers : {
                    "x-access-token" : token,
                }
            });
            setpriceMargin(res.data.stateGasPrice.profit_margin);
            setPricePerGallon(res.data.stateGasPrice.price_per_gallon); // Set price per gallon if fetched
        } catch (error) {
            console.error('Error in getGallonprice:', error);
        }
    }
    const getAddress = async (username) => {
        try {
            const res = await axios.get(`http://localhost:8080/fuel/user/${username}`, {
                headers : {
                    "x-access-token" : token,
                }
            });
            if (res.data.userProfile?.address1) {
                setAddress(res.data.userProfile.address1); // Set address if fetched
                setCity(res.data.userProfile.city); // Set city if fetched
                setState(res.data.userProfile.state); // Set state if fetched
                setZipcode(res.data.userProfile.zipcode); // Set zipcode if fetched
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    
    useEffect(() => {
        if (state) {
            getGallonprice(state);
        }
    }, [state]); 
    
    useEffect(() => {
        if (username) {
            getAddress(username);
        }
    }, [username]); 
    
    useEffect(() => {
        if (pricePerGallon && gallonsRequested && deliveryDate) {
            const calculatedTotal = gallonsRequested * pricePerGallon + (isDeliveryWithin7Days(deliveryDate) ? ADDITIONAL_FEE : 0);
            setTotalPrice(calculatedTotal);
        }
    }, [pricePerGallon, gallonsRequested, deliveryDate]);

    const isDeliveryWithin7Days = (deliveryDate) => {
        const today = new Date();
        const delivery = new Date(deliveryDate);
        const timeDiff = delivery - today;
        const dayDiff = timeDiff / (1000 * 60 * 60 * 24);
        return dayDiff <= 7;
    };
    useEffect(() => {
        if (pricePerGallon && gallonsRequested && deliveryDate) {
            const calculatedTotal = gallonsRequested * pricePerGallon + (isDeliveryWithin7Days(deliveryDate) ? ADDITIONAL_FEE : 0);
            setTotalPrice(calculatedTotal);
        }
    }, [pricePerGallon, gallonsRequested, deliveryDate]);
   
    const handleDeliveryDateChange = (event) => {
        const newDeliveryDate = event.target.value;
        setDeliveryDate(newDeliveryDate);
        const calculatedTotal = gallonsRequested * pricePerGallon + (isDeliveryWithin7Days(newDeliveryDate) ? ADDITIONAL_FEE : 0);
        setTotalPrice(calculatedTotal);
    };

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
                profit_margin: profit_Margin,
                username: username,
            }, {
                headers : {
                    "x-access-token": token,
                }
            });
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
                        ${pricePerGallon.toFixed(2)}
                    </div>
                </div>
                <div className="price-box">
                    <div className="price-title">Total Amount Due</div>
                    <div className="price-value">
                        ${totalPrice.toFixed(2)}
                    </div>
                </div>
            </div>
            <DeliveryFeeNotice />
        </div>
    );
};