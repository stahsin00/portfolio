import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

function SearchCard(props) {
    const [searchQuery, setSearchQuery] = useState('');

    const projectType = ['Web', 'Game'];
    const projectStatus = ['Complete', 'In Progress', 'Inactive'];
    const skills = ['React', 'CSS', 'Tailwind', 'MUI', 'Ant Design', 'Node.js', 'Express', 'GraphQL', 'ASP.Net Core', 'PHP', 'MongoDB', 'MySQL', 'Redis', 'Websocket', 'Unity'];

    const handleSelectionChange = (type) => {
        props.setSelectedTypes(prevSelected => 
            prevSelected.includes(type)
                ? prevSelected.filter(t => t !== type)
                : [...prevSelected, type]
        );
    };

    const handleSearch = () => {
        if (props.targetRef.current) {
            props.targetRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleClear = () => {
        props.setSelectedTypes([])
    };

    return (
        <div className="w-1/3 bg-white rounded-lg hidden md:flex flex-wrap border border-black shadow-md">
            <div className="w-full h-full p-7 2xl:p-10 relative overflow-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-transparent scrollbar-thumb-rounded-lg scrollbar-track-rounded-full">
                <h2 className="text-black text-lg font-bold mb-2 flex items-center"><FaSearch className='mr-2' /> Projects</h2>
                <hr className='2xl:p-2'></hr>
                {
                // <input 
                //     type="text" 
                //     placeholder="Search... (not yet implemented)" 
                //     value={searchQuery}
                //     onChange={(e) => setSearchQuery(e.target.value)}
                //     className="w-full p-3 border border-gray-300 rounded-full mb-10"
                // />
                }

                <h3 className="text-black text-base 2xl:text-l font-bold mb-2 mt-5">Type</h3>
                <hr className='p-1 2xl:p-2'></hr>
                <div className="mb-5 2xl:mb-10 flex flex-wrap gap-3 2xl:gap-4">
                    {projectType.map((type) => (
                        <label key={type} className="text-xs 2xl:text-sm">
                            <input 
                                type="checkbox" 
                                value={type}
                                checked={props.selectedTypes.includes(type)}
                                onChange={() => handleSelectionChange(type)}
                                className="mr-1"
                            />
                            {type}
                        </label>
                    ))}
                </div>

                <h3 className="text-black text-base 2xl:text-l font-bold mb-2">Status</h3>
                <hr className='p-1 2xl:p-2'></hr>
                <div className="mb-5 2xl:mb-10 flex flex-wrap gap-3 2xl:gap-4">
                    {projectStatus.map((type) => (
                        <label key={type} className="text-xs 2xl:text-sm">
                            <input 
                                type="checkbox" 
                                value={type}
                                checked={props.selectedTypes.includes(type)}
                                onChange={() => handleSelectionChange(type)}
                                className="mr-1"
                            />
                            {type}
                        </label>
                    ))}
                </div>

                <h3 className="text-black text-base 2xl:text-l font-bold mb-2">Skills</h3>
                <hr className='p-1 2xl:p-2'></hr>
                <div className="mb-5 2xl:mb-10 flex flex-wrap gap-3 2xl:gap-4">
                    {skills.map((type) => (
                        <label key={type} className="text-xs 2xl:text-sm">
                            <input 
                                type="checkbox" 
                                value={type}
                                checked={props.selectedTypes.includes(type)}
                                onChange={() => handleSelectionChange(type)}
                                className="mr-1"
                            />
                            {type}
                        </label>
                    ))}
                </div>

                <button 
                    onClick={handleSearch} 
                    className="bg-teal-700 hover:bg-teal-900 text-white 2xl:text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full 2xl:absolute 2xl:bottom-10 2xl:right-10"
                >
                    Search
                </button>

                <button 
                    onClick={handleClear} 
                    className="text-gray-500 hover:text-gray-700 2xl:text-lg font-bold py-2 px-4 2xl:absolute 2xl:bottom-10"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}

export default SearchCard;