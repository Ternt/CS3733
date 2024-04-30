import React, {useEffect, useRef} from 'react';
import {Box, Typography} from "@mui/material";
import CarouselComponent from "../../components/Carousel/AboutCarousel.tsx";
import {motion, useAnimation} from "framer-motion";
import brett from '../../assets/TeamPictures/Brett.jpg';
import warwick from '../../assets/TeamPictures/Warwick.jpg';
import alex from '../../assets/TeamPictures/Alex.jpg';
import anton from '../../assets/TeamPictures/Anton.jpg';
import matt from '../../assets/TeamPictures/Matt.jpg';
import mauri from '../../assets/TeamPictures/Mauri.jpg';
import nick from '../../assets/TeamPictures/Nick.jpg';
import rayyan from '../../assets/TeamPictures/Rayyan.png';
import thinh from '../../assets/TeamPictures/Thinh.jpg';
import yuhan from '../../assets/TeamPictures/Yuhan.png';
import zach from '../../assets/TeamPictures/Zach.jpg';
import TranslateTo from "../../helpers/multiLanguageSupport.ts";


function AboutPage() {
    const slidesData = [
        {text1: 'Brett Gerlach', text2: 'Front End Engineer', image: brett},
        {text1: 'Warwick Barker', text2: 'Scrum Master', image: warwick},
        {text1: 'Alex Siracusa', text2: 'Assist Lead', image: alex},
        {text1: 'Anton Sibal', text2: 'Back End Engineer', image: anton},
        {text1: 'Matt Hagger', text2: 'Lead Software Engineer', image: matt},
        {text1: 'Mauricio Mergal', text2: 'Assist Lead', image: mauri},
        {text1: 'Nick Rogerson', text2: 'Document Analyst', image: nick},
        {text1: 'Rayyan Syed', text2: 'Project Manager', image: rayyan},
        {text1: 'Thinh Pham', text2: 'Full-Time Software Engineer', image: thinh},
        {text1: 'Yuhan Wu', text2: 'Product Owner', image: yuhan},
        {text1: 'Zachary Szeto', text2: 'Backend Software Engineer', image: zach},
    ];

    const controls = useAnimation();
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    controls.start('visible');
                } else {
                    controls.start('hidden');
                }
            },
            {
                threshold: 0.5
            }
        );

        const currentElement = ref.current;

        if (currentElement) {
            observer.observe(currentElement);
        }

        return () => {
            if (currentElement) {
                observer.unobserve(currentElement);
            }
        };
    }, [controls, ref]);

    return (
        <motion.div
            initial={{
                opacity: 0
            }}
            animate={{
                opacity: 1
            }}
            transition={{
                duration: 0.75
            }}>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center',
                    backgroundColor: "#e4e4e4",
                    height: '90vh',
                }}
            >
                <Typography
                    sx={{
                        fontWeight: 500,
                        fontSize: '10vh',
                        mt: "-7%",
                    }}
                >
                    {TranslateTo("abtUs.Meet")}
                </Typography>
                <CarouselComponent slides={slidesData}/>
            </Box>

            <Box
                ref={ref}
                bgcolor={"#012d5a"}
                minWidth={"100vw"}
                minHeight={"50vh"}
                px={10}
                sx={{
                    justifyContent: 'center',
                    textAlign: 'center',
                    maxHeight: '90vh',
                }}
            >
                <motion.div
                    initial="hidden"
                    animate={controls}
                    variants={{
                        visible: {y: 0, opacity: 1, transition: {duration: 0.5}},
                        hidden: {y: 100, opacity: 0, transition: {duration: 0.5}}
                    }}
                >
                    <Typography
                        color={"white"}
                        variant="h1"
                    >
                        {TranslateTo("abtUs.TY")}
                    </Typography>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            px: 40,
                            p: 5,
                        }}>
                        <Typography
                            color={"white"}
                            variant="h5"
                        >
                            {TranslateTo("abtUs.Dpt")}
                        </Typography>
                        <Box sx={{
                            flexGrow: 1,
                            borderBottom: '1px dotted white',
                            margin: '0 16px'
                        }}/>
                        <Typography
                            color={"white"}
                            variant="h5"
                        >
                            {TranslateTo("abtUs.Class")}
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            px: 40,
                            p: 5,
                        }}>
                        <Typography
                            color={"white"}
                            variant="h5"
                        >
                            {TranslateTo("professor")}
                        </Typography>
                        <Box sx={{
                            flexGrow: 1,
                            borderBottom: '1px dotted white',
                            margin: '0 16px'
                        }}/>
                        <Typography
                            color={"white"}
                            variant="h5"
                        >
                            Wilson Wong
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            px: 40,
                            p: 5,
                        }}>
                        <Typography
                            color={"white"}
                            variant="h5"
                        >
                            {TranslateTo("teamCoach")}
                        </Typography>
                        <Box sx={{
                            flexGrow: 1,
                            borderBottom: '1px dotted white',
                            margin: '0 16px'
                        }}/>
                        <Typography color={"white"} variant="h5">Ari Schechter</Typography>
                    </Box>
                    <Typography
                        pb={2}
                        color={"#f6bd38"}
                        variant="h4"
                    >
                        {TranslateTo("abtUs.ST")}<br/>
                    </Typography>
                    <Typography
                        pb={2.3}
                        color={"white"}
                        variant="body2"
                        sx={{
                            textDecoration: "underline"
                        }}
                    >
                        {TranslateTo("abtUs.disclaimer")}<br/>
                    </Typography>
                </motion.div>
            </Box>
        </motion.div>
    );
}

export default AboutPage;
