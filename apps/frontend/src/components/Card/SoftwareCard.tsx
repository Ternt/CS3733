import React, { useState, useEffect } from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    },
});

type SoftwareItemProps = {
    name: string,
    description: string,
    website: string,
    height: number,
    icon: string
};
//
// type ImgDimensionProps = {
//     width: number,
//     height: number
// }

export default function SoftwareItem(props: SoftwareItemProps ){
    const classes = useStyles();
    const [iconDimensions, setIconDimensions] = useState<{ width: number, height: number }>({ width: 0, height: 0 });

    useEffect(() => {
        // Load icon image to get its dimensions
        const img = new Image();
        img.onload = () => {
            setIconDimensions({ width: img.width, height: img.height });
        };
        img.src = props.icon;
    }, [props.icon]);

    const handleClick = () => {
        if (props.website) {
            window.open(props.website, '_blank');
        }
    };

    return (
        <Card className={classes.root} onClick={handleClick} sx={{ height: props.height }}>
            <CardMedia
                component="img"
                image={props.icon}
                alt={`${props.name} icon`}
                style={{ width: iconDimensions.width, height: iconDimensions.height }}
            />
            <CardContent>
                <Typography variant="h6">{props.name}</Typography>
                <Typography variant="body2">{props.description}</Typography>
            </CardContent>
        </Card>
    );
};
