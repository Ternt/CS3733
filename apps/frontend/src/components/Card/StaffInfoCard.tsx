import React from 'react';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Avatar } from '@mui/material';

interface StaffMemberProps {
    name: string;
    role: string;
    imageUrl: string;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        maxWidth: 300,
        margin: 'auto',
        textAlign: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        margin: 'auto',
        marginTop: theme.spacing(5),
    },
    name: {
        fontSize: '1.25rem',
        fontWeight: 'bold',
        margin: `${theme.spacing(2)}px 0`,
    },
    role: {
        fontSize: '1rem',
        color: theme.palette.text.secondary,
    },
}));

const StaffInfoCard: React.FC<StaffMemberProps> = ({ name, role, imageUrl }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <Avatar alt={name} src={imageUrl} className={classes.avatar} sx={{width: 100, height: 100}}/>
            <CardContent>
                <Typography variant="h6" className={classes.name}>
                    {name}
                </Typography>
                <Typography variant="body1" className={classes.role}>
                    {role}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default StaffInfoCard;
