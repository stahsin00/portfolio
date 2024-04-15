import React from 'react';
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav className='fixed p-5 space-x-5'>
            <Link to='/portfolio/about'><button className='bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full'>About</button></Link>
            <Link to='/portfolio/projects'><button className='bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full'>Projects</button></Link>
            <Link to='/portfolio/contact'><button className='bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full'>Contact</button></Link>
        </nav>
    );
}

export default Nav;