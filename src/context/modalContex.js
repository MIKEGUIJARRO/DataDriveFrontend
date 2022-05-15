import React, { createContext, useReducer } from 'react'
import Modal from '../components/Modal';
import { SHOW_MODAL, HIDE_MODAL } from '../constants/actionTypes';

export const ModalContext = createContext(null);

const modalReducer = (state, action) => {
    switch (action.type) {
        case SHOW_MODAL:
            return {
                ...state,
                isModalShown: true,
                title: action.payload.title,
                bodyComponent: action.payload.bodyComponent,
                footerComponent: action.payload.footerComponent
            };
        case HIDE_MODAL:
            return {
                ...state,
                isModalShown: false,
                title: '',
                bodyComponent: null,
                footerComponent: null
            };
        default:
            return state;
    }
}

export const ModalProvider = ({ children }) => {
    const [state, dispatchFn] = useReducer(modalReducer, { isModalShown: false });

    const showModal = (title, bodyComponent, footerComponent) => {
        dispatchFn({ type: SHOW_MODAL, payload: { title, bodyComponent, footerComponent } })
    }

    const hideModal = () => {
        dispatchFn({ type: HIDE_MODAL, payload: null });
    }

    return (
        <ModalContext.Provider value={{ ...state, showModal, hideModal }}>
            <Modal />
            {children}
        </ModalContext.Provider>
    );
}