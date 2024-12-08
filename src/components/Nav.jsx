import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { FaBars } from 'react-icons/fa';

function Nav() {
    const [closed, setClosed] = useState(true);

    return (
        <>
            <button className='fixed top-5 left-5  z-50 bg-black hover:bg-teal-700 text-white p-2 rounded-2xl border-2 border-white border-solid md:hidden' onClick={() => setClosed(!closed)}><FaBars size={32} /></button>
            <nav className={`fixed top-20 md:top-0  z-50 space-y-3 p-5 md:space-y-0 md:space-x-5 ${closed ? 'hidden' : 'flex'} md:flex flex-col md:flex-row`}>
                <Link to='/home'><button className='bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full border-2 border-white border-solid' onClick={() => setClosed(true)}>Home</button></Link>
                <Link to='/projects'><button className='bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full border-2 border-white border-solid' onClick={() => setClosed(true)}>Projects</button></Link>
                <Link to='/contact'><button className='bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full border-2 border-white border-solid' onClick={() => setClosed(true)}>Contact</button></Link>
            </nav>
        </>
    );
}

export default Nav;