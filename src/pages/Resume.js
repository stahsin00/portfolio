import React from 'react';
import resumePDF from '../resume.pdf';


function Resume() {
    return (
        <div className="bg-cover bg-center h-screen w-full p-20">
            <iframe
                title="Resume"
                src={resumePDF}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    );
}

export default Resume;