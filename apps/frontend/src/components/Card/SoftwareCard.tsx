import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography } from '@mui/material';
import CardMedia from "@mui/material/CardMedia";

const useStyles = makeStyles({
    root: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#f5f5f5',
        },
    },
    media: {
        width: 50,
        height: 50,
        marginRight: 20,
    },
});

type SoftwareItemProps = {
    icon: string;
    name: string;
    description: string;
    website: string;
};

function  SoftwareItem(props:SoftwareItemProps){
    const classes = useStyles();

    const handleClick = () => {
        if (props.website) {
            window.open(props.website, '_blank');
        }
    };

    return (
        <Card className={classes.root} onClick={handleClick}>
            <CardMedia className={classes.media} component="img" image={props.icon} alt={`${name} icon`} />
            <CardContent>
                <Typography variant="h6">{props.name}</Typography>
                <Typography variant="body2">{props.description}</Typography>
            </CardContent>
        </Card>
    );
};

export default SoftwareItem;
