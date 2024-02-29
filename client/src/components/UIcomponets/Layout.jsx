import { React } from "react";
import { Outlet } from "react-router-dom";//this allows for the navbar to be displayed accross all pages
import { Navbar } from "./Navbar";

export const Layout = () => {
    return(<>
        <Navbar />
        <Outlet />
    </>)
};