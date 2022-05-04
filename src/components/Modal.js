import React from 'react'

const Modal = ({ title, bodyComponent, footerComponent }) => {
    return (
        <>
            {/* Main modal */}
            <div id="defaultModal" tabIndex="-1" aria-hidden="true" className="flex justify-center items-center w-screen h-screen overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full">
                <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow">
                        {/* Modal header */}
                        <div className="flex justify-between items-start p-4 rounded-t border-b">
                            <h3 className="text-xl font-semibold text-gray-900">
                                {title}
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center " data-modal-toggle="defaultModal">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            </button>
                        </div>
                        {/* Modal body */}
                        <div className="p-6 space-y-6">
                            {bodyComponent}
                        </div>
                        {/*  Modal footer */}
                        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200">
                            {footerComponent}
                        </div>
                    </div>
                </div>
            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-gray-800"></div>
        </>

    )
}

export default Modal