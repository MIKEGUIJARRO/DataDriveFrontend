import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '../hooks/useUser'

const RequireAuth = ({ children }) => {

    const { authData } = useUser();
    const location = useLocation();

    if (!authData.profile) {
        return <Navigate to='/auth' state={{ from: location, auth: 'signup' }} replace={true} />
    }

    return (
        children
    )
}

export default RequireAuth
