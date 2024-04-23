import React from 'react';
import SoftwareCard from "../Card/SoftwareCard.tsx";

const SoftwareList = () => {
    const tools = [
        {
            name: 'React',
            description: 'A JavaScript library for building user interfaces',
            website: 'https://reactjs.org/',
            icon: 'url_of_image_1.jpg' // Temporary icon path
        },
        {
            name: 'Express',
            description: 'A web application framework for Node.js',
            website: 'https://expressjs.com/',
            icon: 'express-icon.png' // Temporary icon path
        },
        {
            name: 'Redux',
            description: 'A predictable state container for JavaScript apps',
            website: 'https://redux.js.org/',
            icon: 'redux-icon.png' // Temporary icon path
        }
    ];

    return (
        <div>
            <h2>Software Tools, Libraries, and Frameworks</h2>
            {tools.map((tool, index) => (
                <SoftwareCard
                    key={index}
                    name={tool.name}
                    description={tool.description}
                    website={tool.website}
                    // icon={tool.icon}
                />
            ))}
        </div>
    );
};

export default SoftwareList;
