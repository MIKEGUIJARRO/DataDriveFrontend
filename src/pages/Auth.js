// Libraries
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from "framer-motion"

// Assets
import gLogo from '../assets/g_logo.svg';
import logo from '../assets/logo.svg';
import demoImage from '../assets/DemoImage.png';

// Extra
import { config } from '../constants/constants';


export default function Auth() {
    const location = useLocation();
    const auth = location.state?.auth || null;

    const googleAuth = () => {
        // Opens window locally
        window.open(`${config.url.API_URL}/api/v1/auth/google`, '_self');
    }

    return (
        <div className='flex flex-row h-screen'>
            <div className='flex-1 flex flex-row justify-center items-center relative bg-gradient-to-tr from-cyan-500 to-blue-500'>
                <div className='px-14'>
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
            <div className='w-48 bg-white rounded-md absolute left-4 top-4'>
                <Link to='/'>
                    <img src={logo} alt='Logo' className='w-full h-auto' />
                </Link>
            </div>
            <div className='flex-1 flex justify-center items-center px-8'>
                {auth === 'signin' ?
                    <div className='flex flex-col space-y-8 max-w-md w-full bg-white p-4'>
                        <h2>Sign in</h2>
                        <p>Welcome back! 🎉<br></br>Ready to start edit documents <span className='font-bold'>supah fast</span>?⚡️</p>

                        <button
                            onClick={googleAuth}
                            className='flex flex-row justify-center items-center space-x-2 bg-blue-600 p-2 rounded-md select-none'>
                            <div className='bg-white w-6 rounded-full flex justify-center items-center p-1'>
                                <img src={gLogo} alt='Logo Google' className='w-full h-auto' />
                            </div>
                            <p className='font-bold text-white'>Sign in with Google</p>
                        </button>
                        <hr></hr>
                        <p>Don't have an account? <Link to='/auth' state={{ auth: 'signup' }} className='font-bold'>Sign up</Link></p>
                    </div> :
                    <div className='flex flex-col space-y-8 max-w-md w-full bg-white p-4'>
                        <h2>Sign up</h2>
                        <p>Hello there! 🎉<br></br>Start saving time with the creation of your templates ⏰</p>
                        <button
                            onClick={googleAuth}
                            className='flex flex-row justify-center items-center space-x-2 bg-blue-600 p-2 rounded-md select-none	'>
                            <div className='bg-white w-6 rounded-full flex justify-center items-center p-1'>
                                <img src={gLogo} alt='Logo Google' className='w-full h-auto' />
                            </div>
                            <p className='font-bold text-white'>Sign up with Google</p>
                        </button>

                        <hr></hr>
                        <p className='text-sm text-gray-500'>By signing up I agree the <Link to='/' className='underline'>Privacy Policy</Link> and <Link to='/' className='underline'>Terms of Service</Link></p>
                        <p>Already have an account? <Link to='/auth' state={{ auth: 'signin' }} className='font-bold'>Sign in</Link></p>
                    </div>
                }
            </div>
        </div>
    )
}
