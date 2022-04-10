import React from 'react'
import logo from './../assets/logo.svg';
import { Link } from "react-router-dom";
import Scaffold from './Scaffold';


export const Navbar = () => {
    return (
        <div className='border-solid border-b border-gray-200'>
            <Scaffold>
                <div className='flex flex-row justify-between items-center m-auto py-1'>
                    <ul className='flex flex-row space-x-4'>
                        <li>About</li>
                        <li>Pricing</li>
                        <li>Contact</li>
                    </ul>
                    <div className='w-48'>
                        <Link to='/'>
                            <img src={logo} alt='Logo' className='w-full h-auto' />
                        </Link>
                    </div>
                    <ul className='flex flex-row space-x-4'>
                        <li><Link to='/auth' state={{auth: 'signin'}}>Sign In</Link></li>
                        <li><Link to='/auth' state={{auth: 'signup'}}>Create Account</Link></li>
                    </ul>
                </div>
            </Scaffold>
        </div>
    )
}
