// Libraries
import React, { useState } from 'react'

// Components
import FileExplorer from '../components/FileExplorer';
import LoadingSpinner from '../components/LoadingSpinner';
import Scaffold from '../components/Scaffold';

// Hooks
import { useFetch } from '../hooks/useFetch';

// Assets
import { HiChevronRight, HiHome } from 'react-icons/hi';

// Extra
import { config } from '../constants/constants';

const Home = () => {
    const [breadcrumb, setBreadcrumb] = useState([{ name: 'My Drive', id: 'root' }]);

    const urlDrive = `${config.url.API_URL}/api/v1/drive?folderId=${breadcrumb[breadcrumb.length - 1].id}`

    const options = {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        }
    };

    const { data: driveData, error: driveError, isPending: driveIsPending } = useFetch(urlDrive, options);

    const folderSelectHandler = (id, name) => {
        setBreadcrumb((prevState) => [...prevState, { name, id }]);

    }

    const breadcrumbSelectHandler = (i) => {
        setBreadcrumb((prevState) => {
            const newState = prevState.slice(0, i + 1);
            return newState;
        })
    }

    return (
        <div>
            <Scaffold>
                <div>
                    {/* Breadcrumb */}
                    <div className='flex py-8'>
                        <ul className='inline-flex items-center space-x-1 md:space-x-3'>
                            {breadcrumb.map((item, i) => (
                                <li key={i} className='inline-flex items-center'>
                                    {i > 0 && <HiChevronRight />}
                                    <button
                                        onClick={() => breadcrumbSelectHandler(i)}
                                        disabled={i === breadcrumb.length - 1}
                                        className={`inline-flex items-center text-base font-bold ${i === breadcrumb.length - 1 ? 'text-gray-500' : 'text-gray-600 hover:text-gray-900'} md:ml-2`}>
                                        {i === 0 && <HiHome />}
                                        <span className='ml-1'>
                                            {item.name}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {driveIsPending &&
                        <div className='flex justify-center items-center mt-36'>
                            <LoadingSpinner />
                        </div>}
                    {driveData && !driveIsPending &&
                        <FileExplorer
                            filesAndFolders={driveData.data}
                            folderSelectHandler={folderSelectHandler} />
                    }
                </div>
            </Scaffold >
        </div >
    )
}

export default Home
