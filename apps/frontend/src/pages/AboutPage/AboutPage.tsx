import React, { useRef, useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import CarouselComponent from "../../components/Carousel/AboutCarousel.tsx";
import { motion, useAnimation } from "framer-motion";

function AboutPage() {
    const controls = useAnimation();
    const ref = useRef(null);

    const slidesData = [
        { text1: 'Brett Gerlach', text2: 'Front End Engineer', image: './src/assets/PicturesOfTeam/brett_gerlach.jpg' },
        { text1: 'Warwick Barker', text2: 'Scrum Master', image: './src/assets/PicturesOfTeam/warwick_barker.jpg' },
        { text1: 'Alex Siracusa', text2: 'Assist Lead', image: './src/assets/PicturesOfTeam/alex_siracusa.jpg' },
        { text1: 'Anton Sibal', text2: 'Back End Engineer', image: './src/assets/PicturesOfTeam/anton_sibal.jpg' },
        { text1: 'Matt Hagger', text2: 'Lead Software Engineer', image: './src/assets/PicturesOfTeam/matt_hagger.jpg' },
        { text1: 'Mauricio Mergal', text2: 'Assist Lead', image: './src/assets/PicturesOfTeam/mauricio_mergal.jpg' },
        { text1: 'Nick Rogerson', text2: 'Document Analyst', image: './src/assets/PicturesOfTeam/nick_rogerson.jpg' },
        { text1: 'Rayyan Syed', text2: 'Project Manager', image: './src/assets/PicturesOfTeam/rayyan_syed.png' },
        { text1: 'Thinh Pham', text2: 'Full-Time Software Engineer', image: './src/assets/PicturesOfTeam/thinh_pham.jpg' },
        { text1: 'Yuhan Wu', text2: 'Product Owner', image: './src/assets/PicturesOfTeam/yuhan_wu.png' },
        { text1: 'Zachary Szeto', text2: 'Backend Software Engineer', image: './src/assets/PicturesOfTeam/zachary_szeto.jpg' },
    ];

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
                threshold: 0.5 // Triggers when 50% of the element is in view
            }
        );

        const currentElement = ref.current; // Assign ref.current to a variable

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
                }}
            >
                <Box
                    sx={{
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <Typography
                        fontSize={"md"}
                        variant={"h1"}
                    >
                        Meet the Team
                    </Typography>
                </Box>
                <Box
                    bgcolor={"#e4e4e4"}
                    minWidth={"100vw"}
                    minHeight={"50vh"}
                    padding-top={"5px"}
                    sx={{
                        mt: 2
                    }}
                >
                    <CarouselComponent slides={slidesData} />
                </Box>
                <Box
                    ref={ref}
                    bgcolor={"#012d5a"}
                    minWidth={"100vw"}
                    minHeight={"50vh"}
                    p={10}
                    sx={{
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <motion.div
                        initial="hidden"
                        animate={controls}
                        variants={{
                            visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
                            hidden: { y: 100, opacity: 0, transition: { duration: 0.5 } }
                        }}
                    >
                        <Typography
                            pb={5}
                            color={"white"}
                            variant="h5"
                        >
                            WPI Computer Science Department,<br />
                            CS3733-D24 Software Engineering<br />
                        </Typography>

                        <Box
                            px={40}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                            <Typography
                                color={"white"}
                                variant="h5"
                            >
                                Professor
                            </Typography>
                            <Box sx={{
                                flexGrow: 1,
                                borderBottom: '1px dotted white',
                                margin: '0 16px'
                            }} />
                            <Typography
                                color={"white"}
                                variant="h5"
                            >
                                Wilson Wong
                            </Typography>
                        </Box>
                        <Box
                            p={10}
                            px={40}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%'
                            }}>
                            <Typography
                                color={"white"}
                                variant="h5"
                            >
                                Team Leader
                            </Typography>
                            <Box sx={{
                                flexGrow: 1,
                                borderBottom: '1px dotted white',
                                margin: '0 16px'
                            }} />
                            <Typography color={"white"} variant="h5">Ariel Schechter</Typography>
                        </Box>
                        <Typography
                            pb={5}
                            color={"#f6bd38"}
                            variant="h4"
                        >
                            Also a special thank you to Brigham and Women’s Hospital and their representative, Andrew Shinn<br />
                        </Typography>
                        <Typography
                            pb={5}
                            color={"white"}
                            variant="body2"
                            sx={{
                                textDecoration: "underline"
                            }}
                        >
                            The Brigham & Women’s Hospital maps and data used in this application are copyrighted and provided for the sole use of educational purposes.<br />
                        </Typography>
                    </motion.div>
                </Box>
            </Box>
        </motion.div>
    );
}

export default AboutPage;
