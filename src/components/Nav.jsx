import React from 'react';
import { Link } from 'react-router-dom'

function Nav() {
    return (
        <nav className='fixed p-5 space-x-5'>
            
            <Link to='/portfolio/projects'><button className='bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full border-2 border-white border-solid'>Projects</button></Link>
            <Link to='/portfolio/contact'><button className='bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full border-2 border-white border-solid'>Contact</button></Link>
        </nav>
    );
}

export default Nav;