import React from 'react';
import Project from '../components/Project';

function Projects() {
    const projects = [
        {
          name: 'This Website :D',
          type: 'Web',
          description: 'A portfolio website showcasing my projects.',
          status: 'In Progress',
          techStack: ['React', 'Tailwind CSS'],
          image: 'saunter.png',
          github: 'https://github.com/stahsin00/portfolio.git'
        },
        {
          name: 'Solara',
          type: 'Web',
          description: 'A productivity app that aims to gamify everyday tasks.',
          status: 'In Progress',
          techStack: ['React', 'Node.js', 'MongoDB'],
          image: 'solara.png',
          github: 'https://github.com/stahsin00/Solara.git'
        },
        {
            name: 'Saunter',
            type: 'Web',
            description: 'An endless scrolling image gallery website meant to imitate the feeling of taking a stroll.',
            status: 'Inactive',
            techStack: ['PHP', 'MySQL'],
            image: 'saunter.png'
        },
        {
            name: 'PictureChain',
            type: 'Web',
            description: 'A party game that uses Dall-e\'s image generation to allow user\'s to guess the initial prompt.',
            status: 'Inactive',
            techStack: ['React', 'Python'],
            image: 'picture-chain.png',
            github: 'https://github.com/lhacks-rsmm/picturechain-frontend.git'
        },
        {
            name: 'Cartographer (name subject to change)',
            type: 'Game',
            description: 'World generation using perlin noise to create a variety of landscapes for players to explore and collect resources.',
            status: 'In Progress',
            techStack: ['Unity', 'C#'],
            image: 'cartographer.png'
        },
        {
            name: 'Rover',
            type: 'Game',
            description: '2D metroidvania where the player is a robot that is exploring a new planet.',
            status: 'In Progress',
            techStack: ['Unity', 'C#'],
            image: 'rover.png'
        }
    ];
    
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-20">
            {
                projects.map((project) => (
                    <Project props={project} />
                ))
            }
        </div>
    );
}

export default Projects;