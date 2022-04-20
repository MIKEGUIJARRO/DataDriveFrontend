import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1, { replace: true });
    }

    return (
        <div className='flex flex-row justify-center items-center h-screen'>
            <div className='flex flex-col justify-center items-center space-y-6 '>
                <h1>404 Error</h1>
                <p>Whoops... This page is not available 😪</p>
                <button
                    className=' px-6 py-2 rounded-md bg-gray-100 hover:bg-gray-300'
                    onClick={goBack}>
                    Go back
                </button>
            </div>
        </div>

    )
}

export default NotFound
