// Libraries
import React from 'react'

// Components
import Scaffold from '../components/Scaffold'

export const Help = () => {
    return (
        <Scaffold>
            <Scaffold>
                <h1 className='py-8'>Help?</h1>
                <div className='space-y-8'>
                    <div>
                        <p>Not sure how to use this really intuitive app?</p>
                        <p>No problem, we got you 🦄</p>
                    </div>
                    <ol className='list-decimal pl-12 space-y-4'>
                        <li className='space-y-2'>
                            <p>All your template words need to be formatted with double curly brackets (both sides, no spaces):</p>
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
                            <p>Also, review that your template words are unique (v2 of thi product will handle double)</p>
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
                </div>

            </Scaffold>
        </Scaffold>
    )
}
