import React, { useState } from 'react'
import { HiChevronDown } from 'react-icons/hi';

const DropdownMenu = ({ profilePic, displayName, logoutHandler }) => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    }
    return (
        <div className='relative'>
            <div className='flex flex-row justify-center items-center space-x-2'>
                <div className='w-8 h-8 '>
                    <img src={profilePic} alt='User profile' className='w-full h-auto rounded-full' />
                </div>
                <button
                    onClick={toggleMenu}
                    className='flex flex-row justify-center items-center space-x-2'>
                    <p>{displayName}</p>
                    <HiChevronDown />
                </button>
            </div>
            {open &&
                <div className='absolute right-0 mt-2 py-4 drop-shadow-lg bg-white rounded-md'>
                    <ul className='space-y-2'>
                        <li className='hover:bg-gray-100'>
                            <button className='px-4 py-1'>
                                Profile
                            </button>
                        </li>
                        <li className='hover:bg-gray-100'>
                            <button className='px-4 py-1'>
                                Account Settings
                            </button>
                        </li>
                        <li className='px-4'>
                            <hr />
                        </li>
                        <li className='hover:bg-gray-100'>
                            <button className='px-4 py-1 w-full text-left' onClick={logoutHandler}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            }
        </div>
    )
}

export default DropdownMenu
