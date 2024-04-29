import React from 'react';
import SoftwareCard from "../Card/SoftwareCard.tsx";
import Masonry from '@mui/lab/Masonry';

const SoftwareList = () => {
    const tools = [
        {
            name: 'Auth0',
            description: 'An authentication and authorization platform',
            website: 'https://auth0.com/',
            icon: '',
        },
        {
            name: 'Axios',
            description: 'A promise-based HTTP client for the browser and Node.js',
            website: 'https://axios-http.com/',
            icon: '',
        },
        {
            name: 'csv-parser',
            description: 'A CSV parsing library for Node.js',
            website: 'https://www.npmjs.com/package/csv-parser',
            icon: '',
        },
        {
            name: 'dayjs',
            description: 'A minimalist JavaScript library for datetime manipulation',
            website: 'https://day.js.org/',
            icon: '',
        },
        {
            name: 'Express',
            description: 'A web application framework for Node.js',
            website: 'https://expressjs.com/',
            icon: 'express-icon.png',
        },
        {
            name: 'Eslint',
            description: 'A pluggable JavaScript linter',
            website: 'https://eslint.org/',
            icon: '',
        },
        {
            name: 'Figma',
            description: 'A collaborative interface design tool',
            website: 'https://www.figma.com/',
            icon: '',
        },
        {
            name: 'Framer Motion',
            description: 'A production-ready motion library for React',
            website: 'https://www.framer.com/motion/',
            icon: '',
        },
        {
            name: 'Fuzzy-search',
            description: 'A library for fuzzy searching strings',
            website: 'https://fusejs.io/',
            icon: '',
        },
        {
            name: 'Github',
            description: 'A platform for hosting and collaborating on Git repositories',
            website: 'https://github.com/',
            icon: '',
        },
        {
            name: 'Material UI',
            description: 'React components for faster and easier web development',
            website: 'https://mui.com/',
            icon: '',
        },
        {
            name: 'Node.js',
            description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
            website: 'https://nodejs.org/',
            icon: '',
        },
        {
            name: 'OpenAI',
            description: 'An AI research lab and deployment platform',
            website: 'https://openai.com/',
            icon: '',
        },
        {
            name: 'prisma',
            description: 'A modern database toolkit for TypeScript and Node.js',
            website: 'https://www.prisma.io/',
            icon: '',
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
            website: 'https://www.taiga.io/',
            icon: '',
        },
        {
            name: 'twilio',
            description: 'A cloud communications platform',
            website: 'https://www.twilio.com/',
            icon: '',
        },
        {
            name: 'Vite',
            description: 'A build tool that aims to provide a faster and leaner development experience for modern web projects',
            website: 'https://vitejs.dev/',
            icon: '',
        },
        {
            name: 'Webstorm',
            description: 'A powerful IDE for modern JavaScript development',
            website: 'https://www.jetbrains.com/webstorm/',
            icon: '',
        }
    ];

    return (
        <Masonry>
            {/*<h2>Software Tools, Libraries, and Frameworks</h2>*/}
            {tools.map((tool, index) => (
                <SoftwareCard
                    key={index}
                    name={tool.name.charAt(0).toUpperCase() + tool.name.slice(1)} // Capitalize first letter
                    description={tool.description}
                    website={tool.website}
                    // icon={tool.icon ? require('../../assets/logo.png').default : undefined} // Using actual image paths
                    icon={''}
                />
            ))}
        </Masonry>
    );
};

export default SoftwareList;
