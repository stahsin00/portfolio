import React from 'react';

function Project({props}) {
    console.log(props.name);
    return (
        <div className="w-80 bg-white rounded-lg flex flex-wrap border border-black">
            <img src={require(`../${props.image}`)} alt={props.name} className="w-80 h-64 rounder-t-lg overflow-hidden object-cover object-center" />
            <div className="w-80 h-64 overflow-auto">
                <div className="p-4">
                    <h2 className="text-black text-xl font-bold mb-2">{props.name}</h2>
                    <p className="text-gray-700 mb-2">{props.description}</p>
                    <div className="text-gray-600 mb-2">{props.status}</div>
                    <div className="text-gray-600 mb-4">{props.techStack.join(', ')}</div>
                    {props.github && (
                        <a href={props.github} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">{props.github}</a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Project;