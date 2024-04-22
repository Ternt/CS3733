import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, CardContent, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const ClickableTitle = styled(Typography)({
    textDecoration: 'none',
    cursor: 'pointer',
    color: 'inherit',
    '&:hover': {
        textDecoration: 'underline',
    },
});

type SearchPageCardProps = {
    title: string;
    path: string;
    description: string;
};

function SearchPageCard(props: SearchPageCardProps) {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                maxWidth: "67vw"
            }}
        >
            <CardContent>
                <ClickableTitle variant="h5" onClick={() => navigate(props.path)}>
                    {props.title}
                </ClickableTitle>
                <Typography variant="body1" color="textSecondary">
                    {props.description}
                </Typography>
            </CardContent>
            <Divider />
        </Card>
    );
}

export default SearchPageCard;
