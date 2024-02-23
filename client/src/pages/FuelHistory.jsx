import "../style.css";
import { React } from "react";

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
]

export const FuelHistory = () => {
    return (
        <div className="fuelHistory-wrapper">
            

            {/* TABLE */}
            <table>
                <thead>
                    <tr class="border-t-2 border-b-2  border-900">
                        <th class="font-normal px-10 py-3">Quote ID</th>
                        <th class="font-normal px-10">Gallons Requested</th>
                        <th class="font-normal px-10">Delivery Address</th>
                        <th class="font-normal px-10">Delivery Date</th>
                        <th class="font-normal px-10">Suggested Price Per Gallon</th>
                        <th class="font-normal px-10">Total Due</th>
                    </tr>
                </thead>
                <tbody>
                    {FuelData.map((dataItem, index) => (
                        <tr key={index} className= {index % 2 === 0 ? "bg-slight-grey" : ""}>
                            <td class="px-10 py-3.5 ">{dataItem.quoteId}</td>
                            <td class="px-10">{dataItem.gallonsRequested}</td>
                            <td class="px-10">{dataItem.deliveryAddress}</td>
                            <td class="px-10">{dataItem.deliveryDate}</td>
                            <td class="px-10">${dataItem.suggestedPricePerGallon}</td>
                            <td class="px-10">${dataItem.totalDue}</td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
};