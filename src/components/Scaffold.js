import React from 'react'

const Scaffold = ({ children }) => {
    return (
        <div className='m-auto w-full max-w-screen-lg px-8 xl:px-0'>
            {children}
        </div>
    )
}

export default Scaffold
