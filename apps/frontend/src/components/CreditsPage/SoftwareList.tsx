import React from 'react';
import SoftwareCard from "../Card/SoftwareCard.tsx";
import { Masonry } from '@mui/lab';

import Auth0 from "../../assets/CreditsIcons/auth0.png";
import Axios from "../../assets/CreditsIcons/axios.svg";
import CsvParser from "../../assets/CreditsIcons/docker.svg"; //
import Dayjs from "../../assets/CreditsIcons/DayJS.png";
import Express from "../../assets/CreditsIcons/docker.svg"; //
import Eslint from "../../assets/CreditsIcons/esLint.svg";
import Figma from "../../assets/CreditsIcons/docker.svg"; //
import FramerMotion from "../../assets/CreditsIcons/docker.svg"; //
import FuzzySearch from "../../assets/CreditsIcons/docker.svg"; //
import Github from "../../assets/CreditsIcons/docker.svg"; //
import MaterialUI from "../../assets/CreditsIcons/MUI.svg";
import Nodejs from "../../assets/CreditsIcons/nodeJS.svg";
import OpenAI from "../../assets/CreditsIcons/openAI.svg";
import Prisma from "../../assets/CreditsIcons/prismaWhite.svg";
import ReactIcon from "../../assets/CreditsIcons/react.svg";
import Redux from "../../assets/CreditsIcons/redux.svg";
import Taiga from "../../assets/CreditsIcons/taiga.webp";
import Twilio from "../../assets/CreditsIcons/twilio_mark.svg";
import Vite from "../../assets/CreditsIcons/vite.svg";
import Webstorm from "../../assets/CreditsIcons/docker.svg"; //

const SoftwareList = () => {
    const tools = [
        {
            name: 'Auth0',
            description: 'An authentication and authorization platform',
            website: 'https://auth0.com/',
            icon: Auth0,
            height: 300
        },
        {
            name: 'Axios',
            description: 'A promise-based HTTP client for the browser and Node.js',
            website: 'https://axios-http.com/',
            icon: Axios,
            height: 150
        },
        {
            name: 'csv-parser',
            description: 'A CSV parsing library for Node.js',
            website: 'https://www.npmjs.com/package/csv-parser',
            icon: CsvParser,
            height: 150
        },
        {
            name: 'dayjs',
            description: 'A minimalist JavaScript library for datetime manipulation',
            website: 'https://day.js.org/',
            icon: Dayjs,
            height: 150
        },
        {
            name: 'Express',
            description: 'A web application framework for Node.js',
            website: 'https://expressjs.com/',
            icon: Express,
            height: 150
        },
        {
            name: 'Eslint',
            description: 'A pluggable JavaScript linter',
            website: 'https://eslint.org/',
            icon: Eslint,
            height: 150
        },
        {
            name: 'Figma',
            description: 'A collaborative interface design tool',
            website: 'https://www.figma.com/',
            icon: Figma,
            height: 150
        },
        {
            name: 'Framer Motion',
            description: 'A production-ready motion library for React',
            website: 'https://www.framer.com/motion/',
            icon: FramerMotion,
            height: 150
        },
        {
            name: 'Fuzzy-search',
            description: 'A library for fuzzy searching strings',
            website: 'https://fusejs.io/',
            icon: FuzzySearch,
            height: 150
        },
        {
            name: 'Github',
            description: 'A platform for hosting and collaborating on Git repositories',
            website: 'https://github.com/',
            icon: Github,
            height: 150
        },
        {
            name: 'Material UI',
            description: 'React components for faster and easier web development',
            website: 'https://mui.com/',
            icon: MaterialUI,
            height: 150
        },
        {
            name: 'Node.js',
            description: 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
            website: 'https://nodejs.org/',
            icon: Nodejs,
            height: 150
        },
        {
            name: 'OpenAI',
            description: 'An AI research lab and deployment platform',
            website: 'https://openai.com/',
            icon: OpenAI,
            height: 150
        },
        {
            name: 'prisma',
            description: 'A modern database toolkit for TypeScript and Node.js',
            website: 'https://www.prisma.io/',
            icon: Prisma,
            height: 150
        },
        {
            name: 'React',
            description: 'A JavaScript library for building user interfaces',
            website: 'https://reactjs.org/',
            icon: ReactIcon,
            height: 150
        },
        {
            name: 'Redux',
            description: 'A predictable state container for JavaScript apps',
            website: 'https://redux.js.org/',
            icon: Redux,
            height: 150
        },
        {
            name: 'Taiga',
            description: 'An open-source project management platform',
            website: 'https://www.taiga.io/',
            icon: Taiga,
            height: 150
        },
        {
            name: 'twilio',
            description: 'A cloud communications platform',
            website: 'https://www.twilio.com/',
            icon: Twilio,
            height: 150
        },
        {
            name: 'Vite',
            description: 'A build tool that aims to provide a faster and leaner development experience for modern web projects',
            website: 'https://vitejs.dev/',
            icon: Vite,
            height: 150
        },
        {
            name: 'Webstorm',
            description: 'A powerful IDE for modern JavaScript development',
            website: 'https://www.jetbrains.com/webstorm/',
            icon: Webstorm,
            height: 150
        }
    ];

    return (
        <div style={{ marginTop: '3rem' }}>
            <Masonry columns={3} spacing={2}>
                {/*<h2>Software Tools, Libraries, and Frameworks</h2>*/}
                {tools.map((tool, index) => (
                    <SoftwareCard
                        key={index}
                        name={tool.name.charAt(0).toUpperCase() + tool.name.slice(1)}
                        description={tool.description}
                        website={tool.website}
                        icon={tool.icon}
                        height = {tool.height}
                    />
                ))}
            </Masonry>
        </div>
    );
};

export default SoftwareList;
