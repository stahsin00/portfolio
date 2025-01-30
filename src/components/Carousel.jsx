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
        <div className='w-fit bg-teal-400/70 shadow-[0_0_6px_2px_#14b8a6] border-4 border-teal-400 text-black pt-2 px-5 pr-20 [clip-path:polygon(0_0,85%_0,100%_100%,0%_100%)]'>
            <h1 className='text-black text-lg md:text-4xl 2xl:text-5xl font-vt323 flex items-center mb-2 md:justify-start'> Welcome to my Portfolio</h1>
        </div>
        <div className='bg-black/20 w-full flex flex-col items-center justify-center mt-2 pb-5 shadow-[0_0_6px_2px_#14b8a6] border-4 border-teal-400'>
            <h2 className='text-black text-2xl 2xl:text-2xl font-vt323 shadow-[0_0_6px_2px_#14b8a6] bg-teal-400/70 border-b-4 border-teal-400 px-20 [clip-path:polygon(0_0,100%_0,85%_100%,15%_100%)] mt-2'>Featured Projects</h2>
            <div className='flex justify-center md:justify-between items-center py-2 2xl:pt-5 2xl:pb-10 w-full h-80 md:h-72 2xl:h-120'>
                <button className='hidden md:block p-1 py-20 cursor-auto shadow-[0_0_6px_2px_#14b8a6] border-r-4 border-teal-400 bg-teal-400/80 [clip-path:polygon(0_0%,100%_20%,100%_80%,0%_100%)]'>
                    <FaAngleLeft size={32} onClick={onLeftClick} className='cursor-pointer text-gray-600 hover:text-gray-900 z-40' />
                </button>
                <div className='flex flex-col md:flex-row text-black justify-around w-4/5' onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
                    <img src={`/assets/${featuredProjects[curIndex].image}`} alt={featuredProjects[curIndex].name} className="w-full md:w-3/5 2xl:w-3/5 h-auto shadow-md rounded-lg" style={{imageRendering: featuredProjects[curIndex].pixelated ? 'pixelated' : 'auto'}} />
                    <div className='bg-teal-400/70 p-2 w-full md:w-1/4 shadow-[0_0_6px_2px_#14b8a6] border-4 border-teal-400'>
                        <h3 className="text-xl 2xl:text-3xl mt-2 md:mt-0 mb-2 2xl:mb-5 font-vt323">{featuredProjects[curIndex].name}</h3>
                        <hr className='p-1 2xl:p-2 border-teal-700'></hr>
                        <div className="text-xs 2xl:text-xl font-bold mb-1 text-teal-900">{featuredProjects[curIndex].techStack.join(', ')}</div>
                        <p className='mt-2 2xl:mt-5 mb-2 2xl:mb-5'>{featuredProjects[curIndex].description}</p>
                        <div className='flex gap-2 mt-2 2xl:mt-5'>
                                {featuredProjects[curIndex].github && (
                                    <a href={featuredProjects[curIndex].github} target="_blank" rel="noreferrer" className="text-teal-900/50 hover:text-teal-900 z-40"><FaGithub size={32} /></a>
                                )}
                                {featuredProjects[curIndex].link && (
                                    <a href={featuredProjects[curIndex].link} target="_blank" rel="noreferrer" className="text-teal-900/50 hover:text-teal-900 z-40"><FaExternalLinkAlt size={32} /></a>
                                )}
                                {featuredProjects[curIndex].itch && (
                                    <a href={featuredProjects[curIndex].itch} target="_blank" rel="noreferrer" className="text-teal-900/50 hover:text-teal-900 z-40"><FaItchIo size={32} /></a>
                                )}
                            </div>
                    </div>
                </div>
                <button className='hidden md:block p-1 py-20 cursor-auto shadow-[0_0_6px_2px_#14b8a6] border-l-4 border-teal-400 bg-teal-400/80 [clip-path:polygon(0_20%,100%_0,100%_100%,0%_80%)]'>
                    <FaAngleRight size={32} onClick={onRightClick} className='cursor-pointer text-gray-600 hover:text-gray-900 z-40' />
                </button>
            </div>
            <div className='flex gap-5 md:gap-3'>
                {
                    featuredProjects.map((project, index) => (
                        <button className={`${index == curIndex ? 'text-teal-400' : 'text-gray-600'} hover:text-teal-500 text-xl md:text-sm 2xl:text-lg z-40`} onClick={() => {setCurIndex(index)}}>
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