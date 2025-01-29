import React from 'react';
import { FaTimes } from 'react-icons/fa';

function ImageModal({ selectedImage, setSelectedImage }) {

    return (
        <>
        {
            selectedImage ?
            <div className="bg-black bg-opacity-70 w-screen h-screen p-0 m-0 fixed top-0 left-0 z-50 hidden lg:flex justify-center items-center" onClick={() => setSelectedImage(null)}>
                <button className='text-white fixed top-5 right-5'><FaTimes size={32} /></button>
                <img src={`/assets/${selectedImage.image}`} alt={selectedImage.name} className="w-auto h-3/4" style={{imageRendering: selectedImage.pixelated ? 'pixelated' : 'auto'}}/>
            </div>
            :
            <></>
        }
        </>
    );
}

export default ImageModal;