import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Socials() {
    return (
        <div className='fixed bottom-0  z-50 flex md:flex-col p-5 space-x-2 md:space-x-0 md:space-y-5'>
            <a href="https://www.linkedin.com/in/shushama-tahsin-2b8124255/" target="_blank" rel="noreferrer" className='bg-black hover:bg-teal-700 text-white p-2 rounded-full border-2 border-white border-solid'><FaLinkedin size={32} /></a>
            <a href="https://github.com/stahsin00" target="_blank" rel="noreferrer" className='bg-black hover:bg-teal-700 text-white p-2 rounded-full border-2 border-white border-solid'><FaGithub size={32} /></a>
        </div>
    );
}

export default Socials;