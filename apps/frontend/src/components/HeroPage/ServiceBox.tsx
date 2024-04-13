import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
// import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { useNavigate } from "react-router-dom";
import React from 'react';

type ServiceBoxProps = {
    path: string,
    header: string,
    descriptiveText: string,
    icon: React.ReactNode,
    };

function ServiceBox(props: ServiceBoxProps) {
    const navigate = useNavigate();

    const handleMenuItemClick = (path: string) => {
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
                        {props.icon}
                        {/*<HomeRepairServiceIcon style={{ fontSize: "40px" }} />*/}
                        <Typography variant="h5" component="h2">
                            {props.header}
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            {props.descriptiveText}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
}


export default ServiceBox;
