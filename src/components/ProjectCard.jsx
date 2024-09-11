import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({project, selectImage}) {

    function getColor(status) {
        switch (status) {
            case 'Complete':
                return 'bg-green-600';
            case 'In Progress':
                return 'bg-yellow-600';
            default:
                return 'bg-gray-600';
        }
    }

    return (
        <div className="md:w-120 bg-white rounded-lg flex flex-wrap border border-black shadow-md">
            <div className='flex justify-center w-full'>
                <img src={`/portfolio/assets/${project.image}`} alt={project.name} className="w-auto md:h-64 rounded-t-lg cursor-pointer" onClick={() => selectImage()}/>
            </div>
            <div className="w-full h-64 overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-track-rounded-full">
                <div className="p-4">
                    <h2 className="text-black text-xl font-bold mb-2">{project.name}</h2>
                    <hr className='p-2'></hr>
                    <p className="text-gray-700 mb-2">{project.description}</p>
                    <div className={`${getColor(project.status)} text-white mb-2 px-1 text-sm font-bold rounded-full inline-block`}>{project.status}</div>
                    <div className="text-gray-600 mb-4 text-sm font-bold">{project.techStack.join(', ')}</div>
                    <div className='flex gap-2'>
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer" className="text-teal-500 hover:text-teal-700"><FaGithub size={32} /></a>
                        )}
                        {project.link && (
                            <a href={project.link} target="_blank" rel="noreferrer" className="text-teal-500 hover:text-teal-700"><FaExternalLinkAlt size={32} /></a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;