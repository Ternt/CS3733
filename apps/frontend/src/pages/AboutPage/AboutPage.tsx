import React from 'react';
import {Box, Typography} from "@mui/material";
import CarouselComponent from "../../components/Carousel/AboutCarousel.tsx";
import {motion} from "framer-motion";

function AboutPage() {
    const slidesData = [
        {text1: 'Brett Gerlach', text2: 'Front End Engineer', image: './src/assets/PicturesOfTeam/brett_gerlach.jpg'},
        {text1: 'Warwick Barker', text2: 'Scrum Master', image: './src/assets/PicturesOfTeam/warwick_barker.jpg'},
        {text1: 'Alex Siracusa', text2: 'Assist Lead', image: './src/assets/PicturesOfTeam/alex_siracusa.jpg'},
        {text1: 'Anton Sibal', text2: 'Back End Engineer', image: './src/assets/PicturesOfTeam/anton_sibal.jpg'},
        {text1: 'Matt Hagger', text2: 'Lead Software Engineer', image: './src/assets/PicturesOfTeam/matt_hagger.jpg'},
        {text1: 'Mauricio Mergal', text2: 'Assist Lead', image: './src/assets/PicturesOfTeam/mauricio_mergal.jpg'},
        {text1: 'Nick Rogerson', text2: 'Document Analyst', image: './src/assets/PicturesOfTeam/nick_rogerson.jpg'},
        {text1: 'Rayyan Syed', text2: 'Project Manager', image: './src/assets/PicturesOfTeam/rayyan_syed.png'},
        {
            text1: 'Thinh Pham',
            text2: 'Full-Time Software Engineer',
            image: './src/assets/PicturesOfTeam/thinh_pham.jpg'
        },
        {text1: 'Yuhan Wu', text2: 'Product Owner', image: './src/assets/PicturesOfTeam/yuhan_wu.png'},
        {
            text1: 'Zachary Szeto',
            text2: 'Backend Software Engineer',
            image: './src/assets/PicturesOfTeam/zachary_szeto.jpg'
        },
    ];

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
                    Meet the Team
                </Typography>
                <CarouselComponent slides={slidesData}/>
            </Box>
        </motion.div>
    );
}

export default AboutPage;
