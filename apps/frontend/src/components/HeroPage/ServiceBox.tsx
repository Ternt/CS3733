import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React from 'react';

type ServiceBoxProps = {
    path: string,
    header: string,
    descriptiveText: string,
    icon: React.ReactNode,
    onClick?: () => void
};

function ServiceBox(props: ServiceBoxProps) {
    const navigate = useNavigate();

    const handleMenuItemClick = (path: string) => {
        if(props.onClick){
            props.onClick();
            return;
        }
        navigate(path);
    };


    return (
        <>
            <Grid
                item
                xs={12}
                sm={6}
                md={4}
                onClick={() => handleMenuItemClick(props.path)}
            >
                <Card
                    sx={{
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        transition: "all 0.2s ease-in-out",

                        "&:hover": {
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            border: "1px solid #999",
                            transform: 'translateY(-8px)',
                            "& > .btmstripe": {
                                backgroundColor: "#f6bd38",
                            },
                        },
                        cursor: "pointer",
                        height: "30vh",
                        position: "relative",
                    }}
                >
                    <Box
                        className={"btmstripe"}
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "10%",
                            backgroundColor: "#012d5a",
                            transition: "background-color 0.2s ease-in-out",
                        }}
                    />
                    <CardContent>
                        {React.cloneElement(props.icon, {style: {fontSize: '50px'}})}
                        <Typography component="h2" sx={{
                            fontSize: '22px',
                        }}>
                            {props.header}
                        </Typography>
                        <Typography variant="body1" color="textSecondary"  style={{whiteSpace: 'pre-line'}}>
                            {props.descriptiveText}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}


export default ServiceBox;
