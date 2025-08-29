import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

function Socials() {
    return (
        <div className='fixed bottom-0  z-50 flex md:flex-col p-5 -space-x-5 md:space-x-0 md:-space-y-5'>
            <a href="https://www.linkedin.com/in/shushama-tahsin-2b8124255/" target="_blank" rel="noreferrer" className='bg-teal-400/70 hover:bg-teal-500/70 text-black h-12 w-24 md:h-20 md:w-12 flex justify-center items-center [clip-path:polygon(35%_0,100%_0,65%_100%,0_100%)] md:[clip-path:polygon(0_35%,100%_0,100%_65%,0%_100%)] shadow-[0_0_6px_2px_#14b8a6]'><FaLinkedin size={32} /></a>
            <a href="https://github.com/stahsin00" target="_blank" rel="noreferrer" className='bg-teal-400/70 hover:bg-teal-500/70 text-black h-12 w-24 md:h-20 md:w-12 flex justify-center items-center [clip-path:polygon(35%_0,100%_0,65%_100%,0_100%)] md:[clip-path:polygon(0_35%,100%_0,100%_65%,0%_100%)] shadow-[0_0_6px_2px_#14b8a6]'><FaGithub size={32} /></a>
        </div>
    );
}

export default Socials;