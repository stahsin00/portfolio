import React, { useState, useEffect, useRef } from 'react';
import ProjectCard from '../components/ProjectCard';
import SearchCard from '../components/SearchCard';
import projects from '../data/projects.json';
import ImageModal from '../components/ImageModal';
import ParticleBackground from '../components/ParticleBackground';

const DEFAULT_FILTERS = ['Complete', 'In Progress'];

function Projects() {
    const [day, setDay] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [selectedTypes, setSelectedTypes] = useState(DEFAULT_FILTERS);
    const [selectedImage, setSelectedImage] = useState(null);
    const targetRef = useRef(null);

    const roomImage = day ? '/assets/room-day.png' : '/assets/room-night.png';

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
        <div style={{ backgroundColor: '#001512', minHeight: '100vh', position: 'relative' }}>
            <ParticleBackground />
            <div style={{ position: 'relative', zIndex: 1 }}>
                <div className='flex justify-around h-dvh md:h-screen w-full py-20'>
                    <img src={roomImage} alt='pixel art of a room' className='w-auto h-auto px-2 md:h-full' style={{ imageRendering: 'pixelated' }} />
                    <SearchCard selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} targetRef={targetRef}/>
                </div>
                <div className='w-full px-2 md:px-20'>
                    <hr></hr>
                </div>
                <div className='flex justify-center py-20' ref={targetRef}>
                    <div className='grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-4 sm:w-11/12 md:w-10/12 lg:w-4/5 justify-items-center'>
                        {
                            filteredProjects.map((project) => (
                                <ProjectCard key={project.name} project={project} selectImage={() => {setSelectedImage(project)}} />
                            ))
                        }
                    </div>
                </div>
                <ImageModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
            </div>
        </div>
    );
}

export default Projects;