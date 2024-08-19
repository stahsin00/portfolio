import React, { useState } from 'react';

function SearchCard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTypes, setSelectedTypes] = useState([]);

    const projectType = ['Web', 'Game', 'Other'];
    const projectStatus = ['Complete', 'In Progress', 'Inactive'];
    const techStack = ['React', 'Node.js', 'Express', 'GraphQL', 'MySQL', 'Ant Design', 'styled-components'];

    const handleSelectionChange = (type) => {
        setSelectedTypes(prevSelected => 
            prevSelected.includes(type)
                ? prevSelected.filter(t => t !== type)
                : [...prevSelected, type]
        );
    };

    const handleSearch = () => {
        // TODO
    };

    const handleClear = () => {
        // TODO
    };

    return (
        <div className="w-1/3 bg-white rounded-lg flex flex-wrap border border-black shadow-md">
            <div className="w-full h-full p-10 relative overflow-auto">
                <h2 className="text-black text-xl font-bold mb-2">Projects</h2>
                <hr className='p-2'></hr>
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-full mb-10"
                />

                <h3 className="text-black text-l font-bold mb-2">Type</h3>
                <hr className='p-2'></hr>
                <div className="mb-10 flex flex-wrap gap-4">
                    {projectType.map((type) => (
                        <label key={type} className="text-sm">
                            <input 
                                type="checkbox" 
                                value={type}
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleSelectionChange(type)}
                                className="mr-1"
                            />
                            {type}
                        </label>
                    ))}
                </div>

                <h3 className="text-black text-l font-bold mb-2">Status</h3>
                <hr className='p-2'></hr>
                <div className="mb-10 flex flex-wrap gap-4">
                    {projectStatus.map((type) => (
                        <label key={type} className="text-sm">
                            <input 
                                type="checkbox" 
                                value={type}
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleSelectionChange(type)}
                                className="mr-1"
                            />
                            {type}
                        </label>
                    ))}
                </div>

                <h3 className="text-black text-l font-bold mb-2">Languages & Frameworks</h3>
                <hr className='p-2'></hr>
                <div className="mb-10 flex flex-wrap gap-4">
                    {techStack.map((type) => (
                        <label key={type} className="text-sm">
                            <input 
                                type="checkbox" 
                                value={type}
                                checked={selectedTypes.includes(type)}
                                onChange={() => handleSelectionChange(type)}
                                className="mr-1"
                            />
                            {type}
                        </label>
                    ))}
                </div>

                <button 
                    onClick={handleClear} 
                    className="text-gray-500 hover:text-gray-700 text-lg font-bold py-2 px-4 lg:absolute lg:bottom-10"
                >
                    Clear
                </button>

                <button 
                    onClick={handleSearch} 
                    className="bg-teal-700 hover:bg-teal-900 text-white text-lg font-bold py-2 px-4 pl-6 pr-6 rounded-full lg:absolute lg:bottom-10 lg:right-10"
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchCard;