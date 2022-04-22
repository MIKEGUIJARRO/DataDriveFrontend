import React from 'react'
import gLogo from '../assets/g_logo.svg';
import logo from '../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom'

export default function Auth() {
    const location = useLocation();
    const auth = location.state?.auth || null;
    const from = location.state?.from?.path || '/';

    const googleAuth = () => {
        const width = 600;
        const height = 650;
        const y = window.top.outerHeight / 2 + window.top.screenY - (width / 2);
        const x = window.top.outerWidth / 2 + window.top.screenX - (height / 2);

        let windowFeatures = `toolbar=no, menubar=no, width=${width}, height=${height}, top=${y}, left=${x}`;
        //window.open('http://localhost:5000/api/v1/auth/google', '_blank', windowFeatures);

        // Opens window locally
        window.open('http://localhost:5000/api/v1/auth/google', '_self');
    }

    return (
        <div className='flex flex-row h-screen'>
            <div className='flex-1 bg-blue-400 relative'>
                <div className='w-48 bg-white rounded-md absolute left-4 top-4'>
                    <Link to='/'>
                        <img src={logo} alt='Logo' className='w-full h-auto' />
                    </Link>
                </div>
            </div>

            <div className='flex-1 flex justify-center items-center'>
                {auth === 'signin' ?
                    <div className='flex flex-col space-y-8 max-w-md w-full bg-white p-4'>
                        <h2>Sign in</h2>
                        <p>Welcome back! 🎉<br></br>Sign in and start connecting with your school alumni 🎓</p>

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
                        <p>Hello there! 🎉<br></br>Sign up and improve your communication channels 🏫</p>
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
