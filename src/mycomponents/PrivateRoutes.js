import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { isLoggedIn } from "../Auth";

const PrivateRoutes = () => {
    return isLoggedIn() ? <Outlet /> : <Navigate to={"/login"} />;
}

export default PrivateRoutes
