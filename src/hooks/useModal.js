import { useContext } from "react";

import { ModalContext } from '../context/modalContex';

export const useModal = () => {
    const context = useContext(ModalContext);

    if (context === undefined) {
        throw new Error('useModal() must be used inside a <ModalProvider />')
    }
    return context;
}