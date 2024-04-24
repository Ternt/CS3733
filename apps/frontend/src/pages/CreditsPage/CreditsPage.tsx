import React, {useRef, useEffect} from 'react';
import {Box, Typography} from "@mui/material";
import {motion, useAnimation} from "framer-motion";

function CreditsPage() {
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
    return (<Box
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
                    Thank You!
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
                        WPI CS Department
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
                        CS3733-D24 Software Engineering
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
                        Professor
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
                        Team Leader
                    </Typography>
                    <Box sx={{
                        flexGrow: 1,
                        borderBottom: '1px dotted white',
                        margin: '0 16px'
                    }}/>
                    <Typography color={"white"} variant="h5">Ariel Schechter</Typography>
                </Box>
                <Typography
                    pb={2}
                    color={"#f6bd38"}
                    variant="h4"
                >
                    Also a special thank you to Brigham and Women’s Hospital and their representative, Andrew Shinn<br/>
                </Typography>
                <Typography
                    pb={2.3}
                    color={"white"}
                    variant="body2"
                    sx={{
                        textDecoration: "underline"
                    }}
                >
                    The Brigham & Women’s Hospital maps and data used in this application are copyrighted and provided
                    for the sole use of educational purposes.<br/>
                </Typography>
            </motion.div>
        </Box>
    );
}

export default CreditsPage;
