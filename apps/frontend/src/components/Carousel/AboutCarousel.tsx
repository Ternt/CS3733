import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Define a type for the slides prop
type Slide = {
    image: string;
    text1: string;
    text2: string;
};

interface CarouselProps {
    slides: Slide[];
}

function CarouselComponent({ slides }: CarouselProps) {
    const [index, setIndex] = useState(0);
    const [dir, setDir] = useState(100); // Use this state to manage direction

    // Function to go to the next slide
    const nextSlide = async () => {
        setDir(100); // Setting direction for right movement
        await setTimeout(() => { return; }, 1); // Short delay to manage update sequence
        setIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    // Function to go to the previous slide
    const prevSlide = async () => {
        setDir(-100); // Setting direction for left movement
        await setTimeout(() => { return; }, 1); // Short delay to manage update sequence
        setIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', width: '100vw', height: '60vh', maxHeight: '600px' }}>
            <IconButton onClick={prevSlide} sx={{ position: 'absolute', left: 16, zIndex: 1 }}>
                <ArrowBackIosIcon />
            </IconButton>
            <Box sx={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                <AnimatePresence initial={false}>
                    <motion.div
                        key={index}
                        initial={{ x: `${dir}%` }}
                        animate={{ x: 0 }}
                        exit={{ x: `${-dir}%` }}
                        transition={{ type: 'tween', ease: 'easeInOut', duration: 0.5 }}
                        style={{ position: 'absolute', width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}
                    >
                        <img src={slides[index].image} alt={`Slide ${index}`} style={{ width: '100%', height: '70%', objectFit: 'contain' }} />
                        <Box sx={{ height: '30%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Typography variant="h6" align="center">{slides[index].text1}</Typography>
                            <Typography variant="body1" align="center">{slides[index].text2}</Typography>
                        </Box>
                    </motion.div>
                </AnimatePresence>
            </Box>
            <IconButton onClick={nextSlide} sx={{ position: 'absolute', right: 16, zIndex: 1 }}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
}

export default CarouselComponent;
