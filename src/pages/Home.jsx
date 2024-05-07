import React from 'react';

function Home() {
    return (
        <div className="h-screen w-screen overflow-hidden">
            <img src='/portfolio/assets/construction.png' alt='pixel art of a construction site cone' className='h-auto w-1/4' style={{ imageRendering: 'pixelated' }} />
        </div>
    );
}

export default Home;