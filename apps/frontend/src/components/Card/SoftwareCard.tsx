import React from 'react';
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
        maxWidth: '100%',
        maxHeight: '100%',
    },
});

type SoftwareItemProps = {
    name: string,
    description: string,
    website: string,
    height: string,
    icon: string
};

export default function SoftwareItem(props: SoftwareItemProps ){
    const classes = useStyles();

    const handleClick = () => {
        if (props.website) {
            window.open(props.website, '_blank');
        }
    };

    return (
        <Card className={classes.root} onClick={handleClick} sx={{ height: props.height + "3rem" }}>
            <div className={classes.iconContainer}>
                <CardMedia
                    component="img"
                    image={props.icon}
                    alt={`${props.name} icon`}
                    className={classes.icon}
                />
            </div>
            <CardContent>
                <Typography variant="h6">{props.name}</Typography>
                <Typography variant="body2">{props.description}</Typography>
            </CardContent>
        </Card>
    );
};
