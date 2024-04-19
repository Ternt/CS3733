import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Box, Card, CardMedia, CardContent, Typography, IconButton } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface CarouselItem {
    title: string;
    description: string;
    img: string;
}

interface CarouselProps {
    items: CarouselItem[];
    interval?: number;
}

function CarouselComponent({ items, interval = 3000 }: CarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);


    const resetTimer = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
            setActiveIndex((current) => (current < items.length - 1 ? current + 1 : 0));
        }, interval);
    }, [items.length, interval]);

    const handlePrev = useCallback(() => {
        setActiveIndex((current) => (current > 0 ? current - 1 : items.length - 1));
        resetTimer();
    }, [items.length, resetTimer]);

    const handleNext = useCallback(() => {
        setActiveIndex((current) => (current < items.length - 1 ? current + 1 : 0));
        resetTimer();
    }, [items.length, resetTimer]);

    useEffect(() => {
        resetTimer();
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [resetTimer]);

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                width: '100%',
                pt: 4
        }}>
            <IconButton onClick={handlePrev} sx={{ mx: 1 }}>
                <ArrowBackIosIcon />
            </IconButton>
            <Card
                sx={{
                    flexGrow: 1,
                    maxWidth: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: 'transparent',
                    boxShadow: 'none'
            }}>
                <CardMedia
                    component="img"
                    sx={{
                        height: 'auto',
                        maxHeight: '50vh',
                        width: '100%',
                        objectFit: 'contain',
                        borderRadius: '16px'
                }}
                    image={items[activeIndex].img}
                    alt={items[activeIndex].title}
                />
                <CardContent
                    sx={{
                        flexGrow: 0,
                        backgroundColor: 'transparent'
                }}>
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{
                            textAlign: 'center'
                    }}>
                        {items[activeIndex].title}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ textAlign: 'center'
                    }}>
                        {items[activeIndex].description}
                    </Typography>
                </CardContent>
            </Card>
            <IconButton
                onClick={handleNext}
                sx={{
                    mx: 1
            }}>
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
}

export default CarouselComponent;
