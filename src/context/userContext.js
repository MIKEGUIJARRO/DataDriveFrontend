import React, { createContext, useReducer } from 'react'
import { AUTH, LOGOUT } from '../constants/actionTypes';
import { config } from '../constants/constants';

export const UserContext = createContext(null);

const userReducer = (state, action) => {
    switch (action.type) {
        case AUTH:
            localStorage.setItem('profile', JSON.stringify(action.payload));
            return { ...state, authData: action.payload }
        case LOGOUT:
            localStorage.clear();
            return { ...state, authData: null }
        default:
            return state;
    }
}

export const UserProvider = ({ children }) => {

    const [state, dispatchFn] = useReducer(userReducer, {
        authData: JSON.parse(localStorage.getItem('profile')),
    });

    const authenticateUser = (profile) => {
        dispatchFn({ type: AUTH, payload: profile });
    };

    const logoutUser = () => {
        dispatchFn({ type: LOGOUT, payload: null });
        window.open(`${config.url.API_URL}/api/v1/auth/logout`, "_self");
    }

    return (
        <UserContext.Provider value={{ ...state, authenticateUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    )
}
