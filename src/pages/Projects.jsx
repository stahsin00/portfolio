import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import SearchCard from '../components/SearchCard';

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
            name: 'Purrfect Neighbors',
            type: 'Web',
            description: 'A community-driven app that connects pet owners for adoption, donation, and resource-sharing within their neighborhood.',
            status: 'Complete',
            techStack: ['React', 'Node.js', 'Express', 'GraphQL', 'MySQL', 'Ant Design', 'styled-components'],
            image: 'purrfect-neighbors.png',
            github: 'https://github.com/stahsin00/purrfect-neighbors',
            link: "http://purrfect-neighbors.ca-central-1.elasticbeanstalk.com"
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
          techStack: ['React', 'CSS', 'Node.js', 'Express', 'MongoDB'],
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
            description: 'World generation using perlin noise to create a variety of landscapes for players to explore and collect resources. (Image rendering above is a temporary placeholder to show model.)',
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
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const targetRef = useRef(null);

    useEffect(() => {
        const tempProjects = selectedTypes.length > 0 ? projects.filter(project => {
            return (
                selectedTypes.includes(project.type) || 
                selectedTypes.includes(project.status) || 
                project.techStack.some(tech => selectedTypes.includes(tech))
            );
        }) : projects;

        setFilteredProjects(tempProjects);
      }, [selectedTypes]);
    
    return (
        <div>
            <div className='flex justify-around md:h-screen w-full py-20'> 
                <img src='/portfolio/assets/room-day.png' alt='pixel art of a room' className='w-2/3 h-auto px-2 md:h-full md:w-auto' style={{ imageRendering: 'pixelated' }} />
                <SearchCard selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} targetRef={targetRef}/>
            </div>
            <div className='w-full px-2 md:px-20'>
                <hr></hr>
            </div>
            <div className='flex justify-center py-20' ref={targetRef}>
                <div className='flex flex-wrap justify-around xl:justify-between gap-4 sm:w-11/12 md:w-10/12 lg:w-4/5'>
                    {
                        filteredProjects.map((project) => (
                            <ProjectCard key={project.name} props={project} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default Projects;