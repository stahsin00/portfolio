import React, {useState} from 'react';
import { Link } from 'react-router-dom'
import { FaEllipsisH } from "react-icons/fa";

function Nav() {
    const [closed, setClosed] = useState(true);

    return (
        <>
            <button className='fixed top-5 left-5 z-50 bg-teal-400/70 hover:bg-teal-500/70 text-black h-12 w-24 flex justify-center items-center md:hidden [clip-path:polygon(0_0,65%_0,100%_100%,35%_100%)] shadow-[0_0_6px_2px_#14b8a6]' onClick={() => setClosed(!closed)}><FaEllipsisH size={32} /></button>
            <nav className={`fixed top-20 md:top-0 ml-5 md:ml-0 z-50 space-y-1 p-5 md:space-y-0 md:-space-x-7 ${closed ? 'hidden' : 'flex'} md:flex flex-col md:flex-row`}>
                <Link to='/home'><button className='bg-teal-400/70 hover:bg-teal-500/70 text-black text-lg font-bold w-40 h-10 md:[clip-path:polygon(0_0,75%_0,100%_100%,25%_100%)] shadow-[0_0_6px_2px_#14b8a6]' onClick={() => setClosed(true)}>Home</button></Link>
                <Link to='/projects'><button className='bg-teal-400/70 hover:bg-teal-500/70 text-black text-lg font-bold w-40 h-10 md:[clip-path:polygon(0_0,75%_0,100%_100%,25%_100%)] shadow-[0_0_6px_2px_#14b8a6]' onClick={() => setClosed(true)}>Projects</button></Link>
                {/* <Link to='/contact'><button className='bg-black hover:bg-teal-700 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full border-2 border-white border-solid' onClick={() => setClosed(true)}>Contact</button></Link> */}
            </nav>
        </>
    );
}

export default Nav;