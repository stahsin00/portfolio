import React from 'react';
import backgroundImage from '../background.png';

function About() {
    return (
        <div className="bg-cover bg-center h-screen w-full flex justify-center items-center" style={{ backgroundImage: `url(${backgroundImage})`, imageRendering: 'pixelated' }}>
            <div className='text-white text-2xl bg-black bg-opacity-80 rounded p-5 max-w-4xl'>
                <p>
                    Hello! I'm Shushama, a Computer Science student currently enrolled at Langara. This website 
                    was created to showscase my projects. My primary interests include game development and 
                    web development. Going further, I'd also love to learn more about cybersecurity and have started 
                    my journey through the CompTIA certifications.
                </p>
            </div>
        </div>
    );
}

export default About;