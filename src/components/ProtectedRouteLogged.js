import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../hooks/useUser'

const ProtectedRouteLogged = ({ navigateTo = '/home' }) => {
    
    const { authData } = useUser();
    if (authData) {
        return <Navigate to={navigateTo} replace={true} />
    }

    return (
        <Outlet />
    )
}

export default ProtectedRouteLogged
