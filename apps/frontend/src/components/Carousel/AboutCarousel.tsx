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
            setActiveIndex(current => (current + 1) % items.length);
        }, interval);
    }, [items.length, interval]);

    const handlePrev = useCallback(() => {
        setActiveIndex(current => (current > 0 ? current - 1 : items.length - 1));
        resetTimer();
    }, [items.length, resetTimer]);

    const handleNext = useCallback(() => {
        setActiveIndex(current => (current + 1) % items.length);
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

    const translateX = -activeIndex * 100;

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            overflow: 'hidden'
        }}>
            <IconButton onClick={handlePrev} sx={{ mx: 1 }}>
                <ArrowBackIosIcon />
            </IconButton>
            <Box sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                transform: `translateX(${translateX}%)`,
                transition: activeIndex === 0 ? 'none' : 'transform 0.5s ease-in-out'
            }}>
                {items.map((item, index) => (
                    <Box key={index} sx={{
                        width: '100%',
                        flexShrink: 0
                    }}>
                        <Card
                            sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            backgroundColor: 'transparent',
                            boxShadow: 'none',
                            height: '100%'
                        }}>
                            <CardMedia
                                component="img"
                            sx={{
                                height: 'auto',
                                maxHeight: '50vh',
                                width: '100%',
                                objectFit: 'contain',
                                paddingTop: '24px'
                        }}
                            image={item.img}
                            alt={item.title}
                            />
                            <CardContent
                                sx={{
                                    flexGrow: 0,
                                    backgroundColor: 'transparent'
                            }}
                            >
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    sx={{
                                        textAlign: 'center'
                                }}
                                >
                                    {item.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        textAlign: 'center'
                                }}
                                >
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
            <IconButton
                onClick={handleNext}
                sx={{
                    mx: 1
            }}
            >
                <ArrowForwardIosIcon />
            </IconButton>
        </Box>
    );
}

export default CarouselComponent;
