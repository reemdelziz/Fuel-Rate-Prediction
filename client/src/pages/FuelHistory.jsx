import "../style.css";
import { React, useEffect, useState } from "react";
import Lenis from '@studio-freight/lenis';
import axios from "axios";
import { useAuth } from "../provider/AuthContext";


export const FuelHistory = () => {
    const [FuelData, setFuelData] = useState([]);//dont use this one!!!
    const [testingfuel, settestingfuel] = useState([]); //use this one!!!

    const [quoteQuery, setQuoteQuery] = useState("");
    const [dateQuery, setDateQuery] = useState("");
    const [galQuery, setGalQuery] = useState("");
    const [addyQuery, setAddyQuery] = useState("");
    const { clientInfo } = useAuth();
    const username = clientInfo.username;

    useEffect(() => {
        window.scrollTo(0, 0);
        const lenis = new Lenis()
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    }, []);

    
    const historyData = async (username) => {
        try{
            const resData = await axios.get(`http://localhost:8080/fuel/history/${username}`);
            const fueldataRes = resData.data.fuelHistory;
            //console log the total_price
            
            settestingfuel(fueldataRes);
            console.log(testingfuel);
            
        } catch (error) {
            console.error('Error fetching fuel history:', error);
        }
    };

    useEffect(()=>{
        historyData(username);
    },[username]);
    
    const formatDate = (date) => {
        if (date === "") return ""; 
        
        const [year, month, day, ] = date.split("-");
    
        return `${month}-${day}-${year}`;
    };

    return (
        <div className="fuelHistory-wrapper">
           
            <div className="history-header">
                <h1 className="fuel-history-title">QUOTE HISTORY</h1>
                <h3 className="filter-message">Filter your search</h3>
                <div className="hist-container">
                    <input className="history-filter-bttn" type="search" placeholder="Quote id#" onChange={(e) => setQuoteQuery(e.target.value)} />
                    <input className="history-filter-bttn" type="search" placeholder="Gallons#" onChange={(e) => setGalQuery(e.target.value)} />
                </div>
                <div className="hist-container">
                    <input className="history-filter-bttn" type="date" onChange={(e) => setDateQuery(formatDate(e.target.value))} />
                    <input className="history-filter-bttn" type="search" placeholder="Address" onChange={(e) => setAddyQuery(e.target.value)} />
                </div>
            </div>
            <hr className="mt-10 border-black" />

            <div className="filter-titles">
                <h3 className="filter-button">Quote ID</h3>
                <h3 className="filter-button">Date</h3>
                <h3 className="filter-button">Gallons Requested</h3>
                <h3 className="filter-button">Price Per Gallon</h3>
                <h3 className="filter-button">Total Price</h3>
                <h3 className="filter-button">Address</h3>
            </div>
            <div className="history-titles-wrapper">
                {/* map all of data here */}
                {testingfuel.map((dataItem, index) => (
                    <div className="display-items" key={index}>
                        <h2 className="fuel-histroy-titles"> {dataItem.quoteid}</h2>
                        <p className="history-date">
                         {new Date(dataItem.delivery_date).toLocaleDateString()}
                        </p>
                        <p className="history-gal"> {dataItem.gallons}</p>
                        <p className="history-price-per-gallon">{dataItem.price_per_gallon} </p>
                        <p className="history-total-price">{dataItem.total_price}</p>
                        <p className="history-addy">{dataItem.location}</p>
                    </div>
                ))}



                {/*
                {FuelData.filter((history) =>
                    (quoteQuery === "" || history.quoteId.includes(quoteQuery)) &&
                    (dateQuery === "" || history.deliveryDate.includes(dateQuery)) && 
                    (galQuery === "" || history.gallonsRequested.toString().includes(galQuery)) &&
                    (addyQuery === "" || history.deliveryAddress.includes(addyQuery))
                ).map((dataItem, index) => (
                    <div className="display-items" key={index}>
                        <h2 className="fuel-histroy-titles">quote {dataItem.quoteId}</h2>
                        <p className="history-date">Date: {dataItem.deliveryDate}</p>
                        <p className="history-gal">Gallons requested: {dataItem.gallonsRequested}</p>
                        <p className="history-addy">{dataItem.deliveryAddress}</p>
                    </div>
                ))} */}
            </div>
        </div>
    );
};