import "../style.css";
import { React, useState } from "react";

// creating dummy data for fuel quote history page
const FuelData = [
    {
        quoteId: "0001",
        gallonsRequested: 500,
        deliveryAddress: "123 Elm St, Springiedl",
        deliveryDate: "03-15-2024",
        suggestedPricePerGallon: 2.50,
        totalDue: 1250.00
    },
    {
        quoteId: "0002",
        gallonsRequested: 300,
        deliveryAddress: "456 Oak St, Maplewood",
        deliveryDate: "03-16-2024",
        suggestedPricePerGallon: 2.75,
        totalDue: 825.00
    },
    {
        quoteId: "0003",
        gallonsRequested: 700,
        deliveryAddress: "789 Pine St, Oakville",
        deliveryDate: "03-17-2024",
        suggestedPricePerGallon: 2.45,
        totalDue: 1715.00
    },
    {
        quoteId: "0004",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    
    {
        quoteId: "0005",
        gallonsRequested: 600,
        deliveryAddress: "987 Cedar St, Brookside",
        deliveryDate: "03-19-2024",
        suggestedPricePerGallon: 2.55,
        totalDue: 1530.00
    }
];

export const FuelHistory = () => {
    const [tabIndex, setTabIndex] = useState(1); 

    return (
        <div className="fuelHistory-wrapper">
            {/* Filter/ Menu */}
            <div className="fuelHistory-sidebar">
                <h1 class="flex justify-center py-10 text-5xl">Fuel History.</h1>
                <hr class="m-auto w-2/3 border-black" />
                
                <h2 class ="flex ml-5 py-4 text-xl">Filter</h2>
                {/* Have Filter here*/}

                <h2 class ="flex ml-5 py-2 text-xl">Menu</h2>
                {/*Have Menu here*/}
                <div class="flex flex-col justify-center items-center py-10 text-slate-100">
                    <button className="menu-button" onClick={() => setTabIndex(1)}>
                        Widgets & Leads
                    </button>
                    <button className="menu-button" onClick={() => setTabIndex(2)}>
                        Pricing Module
                    </button>
                </div>

                <p class="">SIGNED AS</p>
                <h3 class="">clientusername@gmail.com</h3>
            </div>
            
            {/* TABLE */}
            {tabIndex === 1 && (
                
                    <table class=" w-full border-l border-black">
                        <thead>
                            <tr class="border-t border-b  border-black">
                                <th class="font-normal px-10 py-3">Quote ID</th>
                                <th class="font-normal px-10">Gallons Requested</th>
                                <th class="font-normal px-36">Delivery Address</th>
                                <th class="font-normal px-10">Delivery Date</th>
                                <th class="font-normal px-10">Suggested Price Per Gallon</th>
                                <th class="font-normal px-10">Total Due</th>
                            </tr>
                        </thead>
                        <tbody class="">
                            {FuelData.map((dataItem, index) => (
                                <tr key={index} className= {index % 2 === 0 ? "bg-slight-grey" : ""}>
                                    <td class="px-10  py-6">{dataItem.quoteId}</td>
                                    <td class="px-16 py-6">{dataItem.gallonsRequested}</td>
                                    <td class="px-36 py-6">{dataItem.deliveryAddress}</td>
                                    <td class="px-10 py-6">{dataItem.deliveryDate}</td>
                                    <td class="px-16 py-6">${dataItem.suggestedPricePerGallon}</td>
                                    <td class="px-10 py-6">${dataItem.totalDue}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                
            )}
            {/* PRICING MODULE */}
            {tabIndex === 2 &&(
                <div> 
                    Pricing Module
                </div>
            )}

        </div>
    );
};