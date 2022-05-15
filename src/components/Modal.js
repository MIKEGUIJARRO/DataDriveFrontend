import React from 'react'
import { createPortal } from 'react-dom'

import { HiOutlineX } from 'react-icons/hi';
import { useModal } from '../hooks/useModal';


const Modal = () => {
    const { hideModal, isModalShown, title, bodyComponent, footerComponent } = useModal();

    const closeModalHandler = () => {
        hideModal();
    }

    if (isModalShown) {
        return createPortal(
            <>
                {/* Main modal */}
                <div
                    id="defaultModal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="flex justify-center items-center w-screen h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
                    <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow">
                            {/* Modal header */}
                            <div className="flex justify-between items-start p-4 rounded-t border-b">
                                <h3 className="text-xl font-semibold text-gray-900">
                                    {title}
                                </h3>
                                <button onClick={closeModalHandler} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal">
                                    <HiOutlineX className='text-gray-700 w-5 h-5 min-w-max' />
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-6 border-b">
                                {bodyComponent}
                            </div>
                            {/*  Modal footer */}
                            <div className="p-6">
                                {footerComponent}
                            </div>
                        </div>
                    </div>
                </div >
                <div className="opacity-25 fixed inset-0 z-40 bg-gray-800"></div>
            </>,
            document.querySelector("#modal-root")
        )
    } else {
        return null;
    }
}

export default Modal
