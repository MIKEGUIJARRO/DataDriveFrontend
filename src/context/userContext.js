import React, { createContext, useReducer } from 'react'
import { AUTH, LOGOUT } from '../constants/actionTypes';

export const UserContext = createContext(null);

const userReducer = (state, action) => {
    switch (action.type) {
        case AUTH:
            return { ...state, user: action.payload }
        case LOGOUT:
            return { ...state }
        default:
            return state;
    }
}

export const UserProvider = ({ children }) => {

    const [state, dispatchFn] = useReducer(userReducer, {
        user: null,
    });

    const authenticateUser = (user) => {
        dispatchFn({ type: AUTH, payload: user });
    };

    const logoutUser = () => {
        dispatchFn({ type: LOGOUT, payload: null });
    }

    return (
        <UserContext.Provider value={{ ...state, authenticateUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    )
}
