import React from 'react'
import Carousel from '../components/Carousel'
import Scaffold from '../components/Scaffold'

export default function Landing() {
    return (
        <Scaffold>
            <h1 className='py-8'>Landing</h1>

            <Carousel>
                <div className='w-40 h-40 bg-red-500'></div>
                <div className='w-40 h-40 bg-green-500'></div>
                <div className='w-40 h-40 bg-blue-500'></div>
                <div className='w-40 h-40 bg-yellow-500'></div>
            </Carousel>

        </Scaffold>
    )
}

