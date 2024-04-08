import React from 'react';
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav className='fixed p-5 space-x-5'>
            <Link to='/'><button className='bg-blue-400 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full'>Overview</button></Link>
            <Link to='/projects'><button className='bg-blue-400 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full'>Projects</button></Link>
            <Link to='/resume'><button className='bg-blue-400 hover:bg-blue-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full'>Resume</button></Link>
        </nav>
    );
}

export default Nav;