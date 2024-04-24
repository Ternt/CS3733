import React from 'react';
import { makeStyles } from '@mui/styles';
import { Card, CardContent, Typography } from '@mui/material';

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
    // icon: string;
    name: string;
    description: string;
    website: string;
};

const SoftwareItem: React.FC<SoftwareItemProps> = ({name, description, website }) => {
    const classes = useStyles();

    const handleClick = () => {
        if (website) {
            window.open(website, '_blank');
        }
    };

    return (
        <Card className={classes.root} onClick={handleClick}>
            {/*<CardMedia className={classes.media} component="img" image={icon} alt={`${name} icon`} />*/}
            <CardContent>
                <Typography variant="h6">{name}</Typography>
                <Typography variant="body2">{description}</Typography>
            </CardContent>
        </Card>
    );
};

export default SoftwareItem;
