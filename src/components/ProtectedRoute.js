import React from 'react'
import { Navigate, useLocation, Outlet } from 'react-router-dom';
import { useUser } from '../hooks/useUser'

const ProtectedRoute = ({ children }) => {
    const { authData } = useUser();
    const location = useLocation();

    if (!authData) {
        return <Navigate to='/auth' state={{ from: location, auth: 'signup' }} replace={true} />
    }

    return (
        <Outlet />
    )
}

export default ProtectedRoute
