import React from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRout =({ children }) =>{
    const authed = sessionStorage.getItem('accessToken') ? true : false;
    return authed ? children : <Navigate to="/"/>;
}