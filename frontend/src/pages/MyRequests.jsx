import React from "react";
import Header from "../components/layout/Header.jsx";
import { Footer } from "../components/layout/Footer.jsx";
import MyRequestList from "../components/MyRequests.jsx";
import Navbar from "../components/layout/navbar.jsx";


export default function MyRequests(){
    return(
        <>
        <Header/>
        <Navbar/>
        <MyRequestList/>
        <Footer/>
        </>
    )
}