import React from 'react'
import gLogo from '../assets/g_logo.svg';
import logo from '../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login';
import { useUser } from '../hooks/useUser';

export default function Auth() {
    const location = useLocation();
    const { auth } = location.state;

    const { authenticateUser } = useUser();

    const clientId = process.env.REACT_APP_CLIENT_ID_GOOGLE;
    console.log(clientId);


    const googleSuccess = async (res) => {
        const response = res?.profileObj;
        const token = res?.tokenId;
        console.log(response);

        try {
            authenticateUser(response);
        } catch (e) {
            console.log(e);
        }
    };

    const googleFailure = async (res) => {
        console.log(res);
    };

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
                        <GoogleLogin
                            clientId={clientId}
                            render={
                                (renderProps) => (
                                    <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className='flex flex-row justify-center items-center space-x-2 bg-blue-600 p-2 rounded-md select-none	'>
                                        <div className='bg-white w-6 rounded-full flex justify-center items-center p-1'>
                                            <img src={gLogo} alt='Logo Google' className='w-full h-auto' />
                                        </div>
                                        <p className='font-bold text-white'>Sign in with Google</p>
                                    </button>
                                )
                            }
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                        />
                        <hr></hr>
                        <p>Don't have an account? <Link to='/auth' state={{ auth: 'signup' }} className='font-bold'>Sign up</Link></p>
                    </div> :
                    <div className='flex flex-col space-y-8 max-w-md w-full bg-white p-4'>
                        <h2>Sign up</h2>
                        <p>Hello there! 🎉<br></br>Sign up and improve your communication channels 🏫</p>
                        <GoogleLogin
                            clientId={clientId}
                            render={
                                (renderProps) => (
                                    <button
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}
                                        className='flex flex-row justify-center items-center space-x-2 bg-blue-600 p-2 rounded-md select-none	'>
                                        <div className='bg-white w-6 rounded-full flex justify-center items-center p-1'>
                                            <img src={gLogo} alt='Logo Google' className='w-full h-auto' />
                                        </div>
                                        <p className='font-bold text-white'>Sign up with Google</p>
                                    </button>
                                )
                            }
                            onSuccess={googleSuccess}
                            onFailure={googleFailure}
                            cookiePolicy={'single_host_origin'}

                        />
                        <hr></hr>
                        <p className='text-sm text-gray-500'>By signing up I agree the <Link to='/' className='underline'>Privacy Policy</Link> and <Link to='/' className='underline'>Terms of Service</Link></p>
                        <p>Already have an account? <Link to='/auth' state={{ auth: 'signin' }} className='font-bold'>Sign in</Link></p>
                    </div>
                }

            </div>

        </div>
    )
}
