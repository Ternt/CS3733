import React from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Box } from '@mui/material';

const useStyles ={
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        objectFit: 'contain',
        cursor: 'pointer',
        height: '18rem',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    },
    iconContainer: {
        minWidth: '8rem',
        minHeight: '8rem',
        maxWidth: '16rem',
        maxHeight: '16rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        maxWidth: '90%',
        maxHeight: '90%',
        aspectRatio: "16/9",
        objectFit: "contain",
    },
};

type SoftwareItemProps = {
    name: string,
    description: string,
    website: string,
    height: string,
    icon: string
};

export default function SoftwareItem(props: SoftwareItemProps ){
    // const classes = useStyles();

    const handleClick = () => {
        if (props.website) {
            window.open(props.website, '_blank');
        }
    };

    return (
        <Grid container justifyContent="center" spacing={3}>
            <Card sx={useStyles.root} onClick={handleClick}>
                <Box sx={useStyles.iconContainer}>
                    <CardMedia
                        component="img"
                        image={props.icon}
                        alt={`${props.name} icon`}
                        sx={useStyles.icon}
                    />
                </Box>
                <CardContent>
                    <Typography variant="h6">{props.name}</Typography>
                    <Typography variant="body2">{props.description}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};
