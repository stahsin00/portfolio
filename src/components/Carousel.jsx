import { useState, useEffect } from 'react';
import projects from '../data/projects.json';
import { FaAngleLeft, FaAngleRight, FaGithub, FaExternalLinkAlt, FaItchIo, FaCircle } from 'react-icons/fa';
import Typewriter from '../components/Typewriter';

function Carousel() {
  const [curIndex, setCurIndex] = useState(0);
  // TODO: what if someone refreshes the page using keyboard while the mouse was hovering
  const [isHovering, setIsHovering] = useState(false);
  const featuredProjects = projects.filter(project => project.featured === "true");

  useEffect(() => {
    if (!isHovering) {
        const interval = setInterval(() => {
        onRightClick();
        }, 5000);

        return () => clearInterval(interval);
    }
  }, [curIndex, isHovering]);

  const onRightClick = () => {
    setCurIndex((prev) => (prev + 1) % featuredProjects.length);
  }

  const onLeftClick = () => {
    setCurIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  }

  return (
    <div className='w-11/12 md:w-4/5 h-3/4 2xl:h-4/5 flex flex-col justify-center mx-auto px-5 relative'>
        <div className='bg-white/60 rounded-lg shadow-[0_0_6px_2px_#14b8a6] border border-teal-500 text-black pt-2 px-5 md:pl-20 md:pr-20 w-full'>
            <div>
            {
            // <div className='flex flex-col md:flex-row md:justify-between'>
            }
                <h1 className='text-black text-lg md:text-4xl 2xl:text-5xl font-vt323 flex items-center mb-2 justify-center md:justify-start'><img src="/portfolio/sunflower.ico" alt="sunflower" className='h-8 md:h-10 2xl:h-11 w-auto mr-2' style={{imageRendering: 'pixelated'}}></img> Welcome to my <span className='text-yellow-400 ml-2 md:ml-3'>Portfolio</span></h1>
                {
                    //<div className='text-lg 2xl:text-xl h-7 2xl:h-10 w-52 2xl:w-64 p-2 mt-2 mb-2 2xl:mb-5 bg-black text-teal-400 rounded-lg font-vt323 border-b border-r border-gray-400 flex items-center'><Typewriter text='Hello! :) '/></div>
                }
            </div>
            {
                //<hr></hr>
            }
        </div>
        <div className='z-10 w-full flex flex-col items-center justify-center mt-3 2xl:mt-10 bg-white/60 py-5 rounded-lg shadow-[0_0_6px_2px_#14b8a6] border border-teal-500'>
            <h2 className='text-black text-2xl 2xl:text-2xl mb-2 md:mb-0 font-vt323'>Featured Projects</h2>
            <div className='flex justify-center md:justify-between items-center py-2 2xl:pt-5 2xl:pb-10 w-full h-80 md:h-72 2xl:h-120'>
                <button className='hidden md:block p-10 z-40 cursor-auto'><FaAngleLeft size={32} onClick={onLeftClick} className='cursor-pointer text-gray-600 hover:text-gray-900' /></button>
                <div className='flex flex-col md:flex-row text-black justify-around w-4/5 z-40' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    <img src={`/portfolio/assets/${featuredProjects[curIndex].image}`} alt={featuredProjects[curIndex].name} className="w-full md:w-3/5 2xl:w-3/5 h-auto transform transition-transform duration-300 hover:scale-105 shadow-md z-50 rounded-lg" style={{imageRendering: featuredProjects[curIndex].pixelated ? 'pixelated' : 'auto'}} />
                    <div className='w-full md:w-1/4'>
                        <h3 className="text-xl 2xl:text-3xl mt-2 md:mt-0 mb-2 2xl:mb-5 font-vt323">{featuredProjects[curIndex].name}</h3>
                        <hr className='p-1 2xl:p-2'></hr>
                        <div className="text-xs 2xl:text-xl font-bold mb-1 text-gray-600">{featuredProjects[curIndex].techStack.join(', ')}</div>
                        <p className='mt-2 2xl:mt-5 mb-2 2xl:mb-5'>{featuredProjects[curIndex].description}</p>
                        <div className='flex gap-2 mt-2 2xl:mt-5'>
                                {featuredProjects[curIndex].github && (
                                    <a href={featuredProjects[curIndex].github} target="_blank" rel="noreferrer" className="text-teal-500 hover:text-teal-700"><FaGithub size={32} /></a>
                                )}
                                {featuredProjects[curIndex].link && (
                                    <a href={featuredProjects[curIndex].link} target="_blank" rel="noreferrer" className="text-teal-500 hover:text-teal-700"><FaExternalLinkAlt size={32} /></a>
                                )}
                                {featuredProjects[curIndex].itch && (
                                    <a href={featuredProjects[curIndex].itch} target="_blank" rel="noreferrer" className="text-teal-500 hover:text-teal-700"><FaItchIo size={32} /></a>
                                )}
                            </div>
                    </div>
                </div>
                <button className='hidden md:block p-10 z-40 cursor-auto'><FaAngleRight size={32} onClick={onRightClick} className='cursor-pointer text-gray-600 hover:text-gray-900' /></button>
            </div>
            <div className='flex gap-5 md:gap-3'>
                {
                    featuredProjects.map((project, index) => (
                        <button className={`${index == curIndex ? 'text-black' : 'text-gray-600'} hover:text-gray-900 text-xl md:text-sm 2xl:text-lg z-40`} onClick={() => {setCurIndex(index)}}>
                            <FaCircle/>
                        </button>
                    ))
                }
            </div>
        </div>
    </div>
    );
}

export default Carousel;