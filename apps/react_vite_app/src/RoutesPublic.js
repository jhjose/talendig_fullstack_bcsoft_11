import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RoutesPublic = ({ isAuthenticated }) => {
    return !isAuthenticated ? <Outlet /> : <Navigate to={'/dashboard'} />;
}

export default RoutesPublic;