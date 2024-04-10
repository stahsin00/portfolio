import React from 'react';
import backgroundImage from '../background.png';

function About() {
    return (
        <div className="bg-cover bg-center h-screen w-full flex justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})`, imageRendering: 'pixelated' }}>
            <div className='text-white text-2xl bg-black bg-opacity-80 rounded p-5 max-w-4xl'>
                Coming Soon.
            </div>
        </div>
    );
}

export default About;