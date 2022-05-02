import React, { useEffect, useRef, useState } from 'react'
import { HiOutlineDocumentText } from 'react-icons/hi';
import { Link, useLocation, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';
import Scaffold from '../components/Scaffold';
import { useFetch } from '../hooks/useFetch';
import { useForm } from '../hooks/useForm';
import { HiDownload } from 'react-icons/hi';

import { motion } from "framer-motion"
import Carousel from '../components/Carousel';


const File = () => {

    const { fileId } = useParams();
    const location = useLocation()
    const fileName = location.state?.fileName;

    const [file, setFile] = useState({ id: fileId, name: fileName || 'Loading...' });

    const urlFile = `http://localhost:5000/api/v1/drive/file/${fileId}`;
    const optionsFile = {
        method: "GET",
        credentials: "include",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        }
    };

    const { data: fileData, error: fileError, isPending: fileIsPending } = useFetch(urlFile, optionsFile);
    const { values, handleInputChange, reset, updateBulkValues } = useForm();

    const refHandlerCarousel = useRef(null);

    useEffect(() => {
        // Apply useState to loaded form
        if (fileData?.data?.keywords.length > 0) {
            const initialStateInputs = {};
            fileData.data.keywords.forEach((keyword) => {
                initialStateInputs[keyword] = '';
            });
            updateBulkValues(initialStateInputs);
        }
    }, [fileData]);
    console.log('Inputs', JSON.stringify(values, null, 4));

    const formHandler = () => {
        refHandlerCarousel.current.nextChildMethod()
    }

    return (
        <div className=''>
            <Scaffold>

                <div className='flex justify-start items-center py-8'>
                    <HiOutlineDocumentText className='text-blue-600 w-16 h-16 min-w-max' />
                    <h2>{file?.name}</h2>
                </div>

                {fileError && <Modal title={`We found a problem 👀`} bodyComponent={
                    <div className='space-y-2'>
                        <p className=''>It looks like your doc has an error: <span className='font-bold	'>{fileError}</span></p>
                        <p>Make sure that your doc contains the proper format 👇</p>
                        <ol className='list-decimal pl-12 space-y-2'>
                            <li className='space-y-2'>
                                <p>All your template words have double curly brackets (both sides, no spaces):</p>
                                <div>
                                    <span className='mr-4'>✅</span>
                                    <span className='bg-green-300 rounded-sm outline-4 outline outline-green-300 font-bold'>{'{{firstName}}'}</span>
                                </div>
                                <div>
                                    <span className='mr-4'>❌</span>
                                    <span className='bg-red-300 rounded-sm outline-4 outline outline-red-300 font-bold'>{'{firstName} }'}</span>
                                </div>

                            </li>
                            <li className='space-y-2'>
                                <p>Make sure that the template words does not have any spaces between words:</p>
                                <div>
                                    <span className='mr-4'>✅</span>
                                    <span className='bg-green-300 rounded-sm outline-4 outline outline-green-300 font-bold'>{'{{lastName}}'}</span>
                                </div>
                                <div>
                                    <span className='mr-4'>❌</span>
                                    <span className='bg-red-300 rounded-sm outline-4 outline outline-red-300 font-bold'>{'{{last Name}}'}</span>
                                </div>
                            </li>
                            <li className='space-y-2'>
                                <p>Also, review that your template words are unique</p>
                                <div className='space-x-4'>
                                    <span>✅</span>
                                    <span className='bg-green-300 rounded-sm outline-4 outline outline-green-300 font-bold '>{'{{firstName1}}'}</span>
                                    <span className='bg-green-300 rounded-sm outline-4 outline outline-green-300 font-bold'>{'{{firstName2}}'}</span>
                                </div>
                                <div className='space-x-4'>
                                    <span>❌</span>
                                    <span className='bg-red-300 rounded-sm outline-4 outline outline-red-300 font-bold'>{'{{firstName}}'}</span>
                                    <span className='bg-red-300 rounded-sm outline-4 outline outline-red-300 font-bold'>{'{{firstName}}'}</span>
                                </div>
                            </li>
                            <li className='space-y-2'>
                                <p>Save your last changes 💾</p>
                            </li>
                        </ol>
                    </div>}
                    footerComponent={
                        <div>
                            <Link to={'/home'}
                                className='text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'>
                                Go back home
                            </Link>
                        </div>
                    }
                />}
                {fileIsPending &&
                    <div className='flex justify-center items-center mt-36 z-20'>
                        <LoadingSpinner />
                    </div>}

                {fileData &&
                    <div className='flex flex-row space-x-16'>
                        <div className='flex-1 z-20'>
                            {fileData.data.thumbnailLink &&
                                <div className='inline-block drop-shadow-xl rounded-2xl overflow-hidden'>
                                    <img className='pointer-events-none	'
                                        src={`https://drive.google.com/thumbnail?sz=w420&id=${fileData.data.id}`}
                                        alt='Google doc thumbnail' />
                                </div>
                            }
                        </div>
                        <div className='flex-1 z-10'>
                            <Carousel
                                handlerRef={refHandlerCarousel}
                            >
                                {fileData.data.keywords &&
                                    <div>
                                        <h4 className='pb-8'>{fileData.data.keywords.length} template {fileData.data.keywords.length > 0 ? 'words' : 'word'} found 🎉</h4>
                                        <form
                                            onSubmit={(e) => e.preventDefault()}
                                            className='p-8 border border-gray-300 rounded-lg'
                                            autoComplete="false">
                                            {fileData.data.keywords.map((item, i) => (
                                                <div className="relative z-0 w-full mb-8 group " key={i}>
                                                    <input onChange={(e) => handleInputChange(e)} type="text" name={item} className="rounded-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-separate border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                                                    <label className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">{item}</label>
                                                </div>
                                            ))}
                                            <button
                                                onClick={() => formHandler()}
                                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Continue</button>
                                        </form>
                                    </div>
                                }
                                {fileData.data.keywords &&
                                    <div>
                                        <h4 className='pb-8'>Download your file 📝</h4>
                                        <div className='p-8 border border-gray-300 rounded-lg space-y-8'>
                                            <button
                                                onClick={() => refHandlerCarousel.current.prevChildMethod()}
                                                className="w-full flex flex-row justify-center items-center space-x-1 text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                                <HiDownload className='text-white w-6 h-6 min-w-max' />
                                                <span>Download PDF</span>
                                            </button>
                                            <button
                                                onClick={() => refHandlerCarousel.current.prevChildMethod()}
                                                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Previous</button>
                                        </div>
                                    </div>
                                }
                            </Carousel>

                        </div>
                    </div>
                }
            </Scaffold>
        </div>

    )
}

export default File
