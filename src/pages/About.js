import React from 'react';
import backgroundImage from '../background.png';

function About() {
    return (
        <div className="bg-cover bg-center h-screen w-full flex justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})`, imageRendering: 'pixelated' }}>
            <div className='text-white text-xl bg-black bg-opacity-50 rounded p-5'>
                Hi! I'm Shushama, a computer science student currently registered at Langara.
            </div>
        </div>
    );
}

export default About;