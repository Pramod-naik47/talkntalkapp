import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRout =({ children }) =>{
    
    const authenticated = localStorage.getItem('isAuthenticated') ? true : false;
    return authenticated ? children : <Navigate to="/"/>;
}