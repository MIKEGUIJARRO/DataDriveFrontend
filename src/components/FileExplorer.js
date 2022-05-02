import React from 'react'
import { HiFolder, HiOutlineDocumentText } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const FileExplorer = ({ filesAndFolders, folderSelectHandler, fileSelectHandler }) => {

    const files = filesAndFolders.filter((item) => {
        return item.mimeType === 'application/vnd.google-apps.document';
    });

    const folders = filesAndFolders.filter((item) => {
        return item.mimeType === 'application/vnd.google-apps.folder';
    });


    return (
        <div className='space-y-4'>
            {folders.length === 0 && files.length === 0 &&
                <div className='flex justify-center mt-36'>
                    <h5>Nothing here... 👀</h5>
                </div>}
            {folders.length > 0 && <h5>Folders</h5>}
            {folders.length > 0 &&
                <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                    {folders.map((item) => (
                        <button
                            key={item.id}
                            className='px-4 py-2 flex justify-start items-center space-x-2 border border-gray-500 rounded-md'
                            onClick={() => folderSelectHandler(item.id, item.name)}>
                            <HiFolder className='text-gray-700 w-8 h-8 min-w-max' />
                            <p className='truncate font-medium'>{item.name}</p>
                        </button>))}
                </div>}
            {files.length > 0 && <h5>Files</h5>}
            <div className='grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                {files.map((item) => (
                    <div key={item.id}>
                        <Link to={`/file/${item.id}`}
                            state={{ fileName: item.name }}
                            className='px-4 py-2 flex justify-start items-center space-x-2 border border-gray-500 rounded-md'>
                            <HiOutlineDocumentText className='text-blue-600 w-8 h-8 min-w-max' />
                            <p className='truncate font-medium'>{item.name}</p>
                        </Link>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default FileExplorer
