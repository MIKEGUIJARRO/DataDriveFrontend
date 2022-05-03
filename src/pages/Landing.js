import React from 'react'
import Scaffold from '../components/Scaffold'
import demoImage from '../assets/DemoImage.png';

import { Link } from 'react-router-dom';
import { motion } from "framer-motion"


export default function Landing() {
    return (
        <Scaffold>
            <div className='mt-32 flex flex-row space-x-8'>
                <div className='flex flex-col justify-center flex-1 shrink-0'>
                    <div className='space-y-8 items-center max-w-md w-full'>
                        <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 leading-normal'><div className='leading-none'>Automate your Google Docs workflow</div></h1>
                        <div>
                            <Link to={'/auth'} state={{ auth: 'signup' }} className='px-4 py-2 bg-blue-600 text-white rounded-md font-bold'>Start saving time ⚡️</Link>
                        </div>
                    </div>
                </div>

                <div className='shrink-0 hidden lg:block'>
                    <motion.div 
                    animate={{
                        //scale: 1.1,
                        y: -50
                    }}
                    transition={{
                        delay: 2,
                        duration: 2.2,
                        repeat: Infinity,
                        repeatType: 'mirror'                        
                    }}>
                        <img className='shadow-lg max-w-sm w-full h-auto rounded-xl -skew-x-6' alt='' src={demoImage} />
                    </motion.div>
                </div>
            </div>
        </Scaffold>
    )
}

