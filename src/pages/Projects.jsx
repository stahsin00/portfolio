import React from 'react';
import ProjectCard from '../components/ProjectCard';

function Projects() {
    const projects = [
        {
          name: 'This Website :D',
          type: 'Web',
          description: 'A portfolio website to showcase my projects.',
          status: 'In Progress',
          techStack: ['React', 'Tailwind CSS'],
          image: 'portfolio.png',
          github: 'https://github.com/stahsin00/portfolio.git'
        },
        {
            name: 'Fluentify',
            type: 'Web',
            description: 'A language learning app that uses Google Translate API and OpenAI API to generate stories and quizzes.',
            status: 'Complete',
            techStack: ['React', 'Tailwind CSS'],
            image: 'fluentify.png',
            github: 'https://github.com/Zanzigzan/CPSC-2350-group-project.git',
            link: "https://fluent-ify.netlify.app/"
          },
        {
          name: 'Solara',
          type: 'Web',
          description: 'A productivity app that aims to gamify everyday tasks.',
          status: 'In Progress',
          techStack: ['React', 'Node.js', 'Express', 'MongoDB'],
          image: 'solara.png',
          github: 'https://github.com/stahsin00/Solara.git'
        },
        {
            name: 'Saunter',
            type: 'Web',
            description: 'An endless scrolling image gallery website meant to imitate the feeling of taking a stroll around the world.',
            status: 'Inactive',
            techStack: ['PHP', 'MySQL'],
            image: 'saunter.png'
        },
        {
            name: 'PictureChain',
            type: 'Web',
            description: 'A party game that uses Dall-e\'s image generation to allow user\'s to guess the initial prompt.',
            status: 'Inactive',
            techStack: ['React', 'Material UI'],
            image: 'picture-chain.png',
            github: 'https://github.com/lhacks-rsmm/picturechain-frontend.git'
        },
        {
            name: 'Cartographer',
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
            status: 'Inactive',
            techStack: ['Unity', 'C#'],
            image: 'rover.png'
        }
    ];
    
    return (
        <div className='w-screen px-20'>
            <div className='flex justify-center h-screen py-20'> 
                <img src='/assets/room-day.png' alt='pixel art of a room' className='h-full w-auto' style={{ imageRendering: 'pixelated' }} />
            </div>
            <hr></hr>
            <div className='flex justify-center w-full py-20'>
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
                    {
                        projects.map((project) => (
                            <ProjectCard key={project.name} props={project} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Projects;