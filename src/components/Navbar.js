import React, { useEffect } from 'react'
import logo from './../assets/logo.svg';
import { Link } from "react-router-dom";
import Scaffold from './Scaffold';
import { useUser } from '../hooks/useUser';
import { HiChevronDown } from "react-icons/hi";
import DropdownMenu from './DropdownMenu';

export const Navbar = () => {

    const { authData, logoutUser } = useUser();

    return (
        <div className='border-solid border-b border-gray-200'>
            <Scaffold>
                <div className='flex flex-row justify-between items-center m-auto py-1'>
                    <ul className='flex flex-row space-x-8'>
                        <li>About</li>
                        <li>Pricing</li>
                        <li>Contact</li>
                    </ul>
                    <div className='w-48'>
                        <Link to='/'>
                            <img src={logo} alt='Logo' className='w-full h-auto' />
                        </Link>
                    </div>
                    {authData ?
                        <DropdownMenu
                            displayName={`${authData?.firstName} ${authData?.lastName}`}
                            profilePic={authData?.profilePicture}
                            logoutHandler={logoutUser}
                        /> :
                        <ul className='flex flex-row space-x-8'>
                            <li><Link to='/auth' state={{ auth: 'signin' }}>Sign In</Link></li>
                            <li><Link to='/auth' state={{ auth: 'signup' }} className='px-4 py-2 bg-blue-600 text-white rounded-md font-bold'>Create Account</Link></li>
                        </ul>}

                </div>
            </Scaffold>
        </div>
    )
}
