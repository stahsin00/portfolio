import { useState, useEffect } from 'react';
import projects from '../data/projects.json';
import { FaAngleLeft, FaAngleRight, FaGithub, FaExternalLinkAlt, FaItchIo, FaCircle } from 'react-icons/fa';
import Typewriter from '../components/Typewriter';

function Carousel() {
  const [curIndex, setCurIndex] = useState(0);
  const featuredProjects = projects.filter(project => project.featured === "true");

  useEffect(() => {
    const interval = setInterval(() => {
      //onRightClick();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const onRightClick = () => {
    setCurIndex((prev) => (prev + 1) % featuredProjects.length);
  }

  const onLeftClick = () => {
    setCurIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  }

  return (
    <div className='bg-black/75 rounded-lg border border-white w-4/5 h-4/5 flex flex-col'>
        <div className='text-white pt-10 pl-20 pr-20 w-full'>
            <h1 className='text-white text-5xl font-bold [text-shadow:_-2px_-2px_0_#000,_2px_-2px_0_#000,_-2px_2px_0_#000,_2px_2px_0_#000] flex items-center'><img src="/portfolio/sunflower.ico" alt="sunflower" className='h-11 w-auto mr-2' style={{imageRendering: 'pixelated'}}></img> Welcome to my <span className='text-yellow-300 ml-3'>Portfolio</span></h1>
            <div className='text-xl h-10 w-64 p-2 mt-2 mb-5 bg-black rounded-lg font-vt323 text-teal-400'><Typewriter text='Hello! :) '/></div>
            <hr></hr>
        </div>
        <div className='w-full flex flex-col items-center mt-5'>
            <h2 className='text-white text-2xl font-bold'>Featured Projects</h2>
            <div className='flex justify-center items-center pt-10 pb-10 w-full h-120'>
                <button className='text-white p-10'><FaAngleLeft size={32} onClick={onLeftClick} /></button>
                <div className='flex text-white gap-10 w-4/5'>
                    <img src={`/portfolio/assets/${featuredProjects[curIndex].image}`} alt={featuredProjects[curIndex].name} className="w-3/5 h-auto" style={{imageRendering: featuredProjects[curIndex].pixelated ? 'pixelated' : 'auto'}} />
                    <div className='w-2/5'>
                        <h3 className="text-3xl font-bold mb-5">{featuredProjects[curIndex].name}</h3>
                        <hr className='p-2'></hr>
                        <div className="font-bold mb-2">{featuredProjects[curIndex].techStack.join(', ')}</div>
                        <p className='mt-5 mb-5'>{featuredProjects[curIndex].description}</p>
                        <div className='flex gap-2 mt-5'>
                                {featuredProjects[curIndex].github && (
                                    <a href={featuredProjects[curIndex].github} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white"><FaGithub size={32} /></a>
                                )}
                                {featuredProjects[curIndex].link && (
                                    <a href={featuredProjects[curIndex].link} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white"><FaExternalLinkAlt size={32} /></a>
                                )}
                                {featuredProjects[curIndex].itch && (
                                    <a href={featuredProjects[curIndex].itch} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white"><FaItchIo size={32} /></a>
                                )}
                            </div>
                    </div>
                </div>
                <button className='text-white p-10'><FaAngleRight size={32} onClick={onRightClick}/></button>
            </div>
            <div className='text-white flex gap-3'>
                {
                    featuredProjects.map((project, index) => (
                        <button className={`${index == curIndex ? 'text-white' : 'text-gray-400'} hover:text-white`}>
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