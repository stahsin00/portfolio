import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import SearchCard from '../components/SearchCard';
import projects from '../data/projects.json';

function Projects() {
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