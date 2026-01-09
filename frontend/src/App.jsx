import React from "react";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page from "./pages/Page.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import VisaApplication from "./pages/VisaApplication.jsx";
import MyRequests from "./pages/MyRequests.jsx";
import Home from "./pages/home.jsx";



function Dashboard(){
  return <h1 className="">Dashboard</h1>
}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/_myrequests_index" element={<MyRequests/>} />
        <Route path="/a" element={<Home/>} />
        <Route path="/_request_index" element={<VisaApplication/>} /> 
        <Route path="/" element={
          <ProtectedRoute>
            <VisaApplication/>
          </ProtectedRoute>
        }/>
      </Routes>   
    </BrowserRouter>
   
  );
}

export default App;