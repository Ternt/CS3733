import React from 'react';
import SoftwareCard from "../Card/SoftwareCard.tsx";

const SoftwareList = () => {
    const tools = [
        {
            name: 'Auth0',
            description: 'An authentication and authorization platform',
            website: 'https://auth0.com/'
        },
        {
            name: 'Axios',
            description: 'A promise-based HTTP client for the browser and Node.js',
            website: 'https://axios-http.com/'
        },
        {
            name: 'csv-parser',
            description: 'A CSV parsing library for Node.js',
            website: 'https://www.npmjs.com/package/csv-parser'
        },
        {
            name: 'dayjs',
            description: 'A minimalist JavaScript library for datetime manipulation',
            website: 'https://day.js.org/'
        },
        {
            name: 'Express',
            description: 'A web application framework for Node.js',
            website: 'https://expressjs.com/',
            icon: 'express-icon.png'
        },
        {
            name: 'Eslint',
            description: 'A pluggable JavaScript linter',
            website: 'https://eslint.org/'
        },
        {
            name: 'Figma',
            description: 'A collaborative interface design tool',
            website: 'https://www.figma.com/'
        },
        {
            name: 'Framer Motion',
            description: 'A production-ready motion library for React',
            website: 'https://www.framer.com/motion/'
        },
        {
            name: 'Fuzzy-search',
            description: 'A library for fuzzy searching strings',
            website: 'https://fusejs.io/'
        },
        {
            name: 'Github',
            description: 'A platform for hosting and collaborating on Git repositories',
            website: 'https://github.com/'
        },
        {
            name: 'Material UI',
            description: 'React components for faster and easier web development',
            website: 'https://mui.com/'
        },
        {
            name: 'Node.js',
            description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
            website: 'https://nodejs.org/'
        },
        {
            name: 'OpenAI',
            description: 'An AI research lab and deployment platform',
            website: 'https://openai.com/'
        },
        {
            name: 'prisma',
            description: 'A modern database toolkit for TypeScript and Node.js',
            website: 'https://www.prisma.io/'
        },
        {
            name: 'React',
            description: 'A JavaScript library for building user interfaces',
            website: 'https://reactjs.org/',
            icon: 'react-icon.png'
        },
        {
            name: 'Redux',
            description: 'A predictable state container for JavaScript apps',
            website: 'https://redux.js.org/',
            icon: 'redux-icon.png'
        },
        {
            name: 'Taiga',
            description: 'An open-source project management platform',
            website: 'https://www.taiga.io/'
        },
        {
            name: 'twilio',
            description: 'A cloud communications platform',
            website: 'https://www.twilio.com/'
        },
        {
            name: 'Vite',
            description: 'A build tool that aims to provide a faster and leaner development experience for modern web projects',
            website: 'https://vitejs.dev/'
        },
        {
            name: 'Webstorm',
            description: 'A powerful IDE for modern JavaScript development',
            website: 'https://www.jetbrains.com/webstorm/'
        }
    ];

    return (
        <div>
            {/*<h2>Software Tools, Libraries, and Frameworks</h2>*/}
            {tools.map((tool, index) => (
                <SoftwareCard
                    key={index}
                    name={tool.name.charAt(0).toUpperCase() + tool.name.slice(1)} // Capitalize first letter
                    description={tool.description}
                    website={tool.website}
                    // icon={tool.icon ? require(`../images/${tool.icon}`).default : undefined} // Using actual image paths
                />
            ))}
        </div>
    );
};

export default SoftwareList;
