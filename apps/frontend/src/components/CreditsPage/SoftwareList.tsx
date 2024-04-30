import React from 'react';
import SoftwareCard from "../Card/SoftwareCard.tsx";
import { Masonry } from '@mui/lab';
import {Container, Grid} from '@mui/material';
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

import Auth0 from "../../assets/CreditsIcons/auth0.svg";
import Axios from "../../assets/CreditsIcons/axios.svg";
import CsvParser from "../../assets/CreditsIcons/csv.png"; //
import Dayjs from "../../assets/CreditsIcons/DayJS.png";
import Docker from "../../assets/CreditsIcons/docker.svg";
import Express from "../../assets/CreditsIcons/express.svg";
import Eslint from "../../assets/CreditsIcons/esLint.svg";
import Figma from "../../assets/CreditsIcons/figma.png";
import FramerMotion from "../../assets/CreditsIcons/framerMColor.svg";
import Github from "../../assets/CreditsIcons/github.svg";
import MaterialUI from "../../assets/CreditsIcons/MUI.svg";
import Nodejs from "../../assets/CreditsIcons/nodeJS.svg";
import OpenAI from "../../assets/CreditsIcons/openAI.svg";
import Prisma from "../../assets/CreditsIcons/prismaWhite.svg";
import ReactIcon from "../../assets/CreditsIcons/react.svg";
import Redux from "../../assets/CreditsIcons/redux.svg";
import Taiga from "../../assets/CreditsIcons/taiga.webp";
import Twilio from "../../assets/CreditsIcons/twilio_mark.svg";
import Vite from "../../assets/CreditsIcons/vite.svg";
import Webstorm from "../../assets/CreditsIcons/WebStorm_Icon.svg";

const SoftwareList = () => {
    const tools = [
        {
            name: 'Auth0',
            description: TranslateTo("auth0.desc"),
            website: 'https://auth0.com/',
            icon: Auth0,
            height: "25rem"
        },
        {
            name: 'Axios',
            description: TranslateTo("axios.desc"),
            website: 'https://axios-http.com/',
            icon: Axios,
            height: "10rem"
        },
        {
            name: 'csv-parser',
            description: TranslateTo("csvP.desc"),
            website: 'https://www.npmjs.com/package/csv-parser',
            icon: CsvParser,
            height: "15rem"
        },
        {
            name: 'dayjs',
            description: TranslateTo("dayjs.desc"),
            website: 'https://day.js.org/',
            icon: Dayjs,
            height: "35rem"
        },
        {
            name: 'Docker',
            description: TranslateTo("docker.desc"),
            website: 'https://www.docker.com/',
            icon: Docker,
            height: "35rem"
        },
        {
            name: 'Express',
            description: TranslateTo("express.desc"),
            website: 'https://expressjs.com/',
            icon: Express,
            height: "10rem"
        },
        {
            name: 'Eslint',
            description: TranslateTo("eslint.desc"),
            website: 'https://eslint.org/',
            icon: Eslint,
            height: "25rem"
        },
        {
            name: 'Figma',
            description: TranslateTo("figma.desc"),
            website: 'https://www.figma.com/',
            icon: Figma,
            height: "15rem"
        },
        {
            name: 'Framer Motion',
            description: TranslateTo("framerM.desc"),
            website: 'https://www.framer.com/motion/',
            icon: FramerMotion,
            height: "25rem"
        },
        {
            name: 'Github',
            description: TranslateTo("github.desc"),
            website: 'https://github.com/',
            icon: Github,
            height: "15rem"
        },
        {
            name: 'Material UI',
            description: TranslateTo("MUI.desc"),
            website: 'https://mui.com/',
            icon: MaterialUI,
            height: "10rem"
        },
        {
            name: 'Node.js',
            description: TranslateTo("node.desc"),
            website: 'https://nodejs.org/',
            icon: Nodejs,
            height: "20rem"
        },
        {
            name: 'OpenAI',
            description: TranslateTo("openAI.desc"),
            website: 'https://openai.com/',
            icon: OpenAI,
            height: "35rem"
        },
        {
            name: 'prisma',
            description: TranslateTo("prisma.desc"),
            website: 'https://www.prisma.io/',
            icon: Prisma,
            height: "20rem"
        },
        {
            name: 'React',
            description: TranslateTo("react.desc"),
            website: 'https://reactjs.org/',
            icon: ReactIcon,
            height: "30rem"
        },
        {
            name: 'Redux',
            description: TranslateTo("redux.desc"),
            website: 'https://redux.js.org/',
            icon: Redux,
            height: "25rem"
        },
        {
            name: 'Taiga',
            description: TranslateTo("taiga.desc"),
            website: 'https://www.taiga.io/',
            icon: Taiga,
            height: "15rem"
        },
        {
            name: 'twilio',
            description: TranslateTo("twilio.desc"),
            website: 'https://www.twilio.com/',
            icon: Twilio,
            height: "20rem"
        },
        {
            name: 'Vite',
            description: TranslateTo("vite.desc"),
            website: 'https://vitejs.dev/',
            icon: Vite,
            height: "25rem"
        },
        {
            name: 'Webstorm',
            description: TranslateTo("webstorm.desc"),
            website: 'https://www.jetbrains.com/webstorm/',
            icon: Webstorm,
            height: "15rem"
        }
    ];

    return (
        <Container style={{ marginTop: '5rem' }}>
            <Grid container justifyContent="center" spacing={3}>
                <Masonry columns={4} spacing={2}>
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
            </Grid>
        </Container>
    );
};

export default SoftwareList;
