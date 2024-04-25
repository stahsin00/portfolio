import React from 'react';

function About() {
    return (
        <div className="h-screen w-full p-20 flex flex-col justify-center items-center text-3xl font-bold">
            <img src='/portfolio/assets/construction.png' alt='pixel art of a construction site cone' className='h-auto w-1/4' style={{ imageRendering: 'pixelated' }} />
            Coming Soon...ish
        </div>
    );
}

export default About;