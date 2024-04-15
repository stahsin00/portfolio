import React from 'react';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

function ProjectCard({props}) {

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
        <div className="w-120 bg-white rounded-lg flex flex-wrap border border-black shadow-md">
            <div className='flex justify-center w-full'>
                <img src={`/assets/${props.image}`} alt={props.name} className="w-auto h-64 rounded-t-lg" />
            </div>
            <div className="w-full h-64 overflow-auto">
                <div className="p-4">
                    <h2 className="text-black text-xl font-bold mb-2">{props.name}</h2>
                    <hr className='p-2'></hr>
                    <p className="text-gray-700 mb-2">{props.description}</p>
                    <div className={`${getColor(props.status)} text-white mb-2 px-1 text-sm font-bold rounded-full inline-block`}>{props.status}</div>
                    <div className="text-gray-600 mb-4 text-sm font-bold">{props.techStack.join(', ')}</div>
                    <div className='flex gap-2'>
                        {props.github && (
                            <a href={props.github} target="_blank" rel="noreferrer" className="text-teal-500 hover:text-teal-700"><FaGithub size={32} /></a>
                        )}
                        {props.link && (
                            <a href={props.link} target="_blank" rel="noreferrer" className="text-teal-500 hover:text-teal-700"><FaExternalLinkAlt size={32} /></a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;