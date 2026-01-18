import React from "react";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Page from "./pages/Page.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import VisaApplicationC from "./pages/VisaApplicationC.jsx";
import VisaApplicationD from "./pages/VisaApplicationD.jsx";
import MyRequests from "./pages/MyRequests.jsx";
import Home from "./pages/home.jsx";
import ULHome from "./pages/ULhome.jsx";
import Dashboard from "./admin pannel/pages/dashboard.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import {NotFound} from "./pages/NotFound.jsx"




function App() {
  const {user} = useAuth()

  return (
  <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ULHome />} />

        {/* Protected Routes Group */}
        <Route element={<ProtectedRoute />}>
          {/* These will only render if ProtectedRoute returns <Outlet /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/_myrequests_index" element={<MyRequests />} />
          <Route path="/_request_index_c" element={<VisaApplicationC />} />
          <Route path="/_request_index_d" element={<VisaApplicationD />} />
          {user?.isAdmin && (
            <Route path="/admin_panel" element={<Dashboard/>} /> 
          )
          } 

          <Route path="*" element={<NotFound/>} />
          
          
        </Route>
      </Routes>
    </BrowserRouter>
   
  );
}

export default App;