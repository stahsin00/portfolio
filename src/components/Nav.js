import React from 'react';

function Nav() {
    return (
        <nav className='fixed p-5 space-x-5'>
            <button className='bg-blue-400 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full'>Overview</button>
            <button className='bg-blue-400 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full'>Projects</button>
            <button className='bg-blue-400 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full'>Resume</button>
        </nav>
    );
}

export default Nav;