import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React from 'react';
import { motion } from "framer-motion";

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

    const itemVariants = {
        hidden: { opacity: 0, y: 75 },
        visible: { opacity: 1, y: 0 }
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
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{amount: .4}}
                    transition={{duration: 0.5}}
                    variants={itemVariants}
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
                            {
                                //@ts-expect-error props icon is real
                                React.cloneElement(props.icon, {style: {fontSize: '50px'}})
                            }
                            <Typography component="h2" sx={{
                                mt: '3%',
                                fontSize: '18px',
                                fontWeight: 500,
                            }}>
                                {props.header}
                            </Typography>
                            <Typography variant="body1" color="textSecondary" style={{whiteSpace: 'pre-line'}} sx={{
                                fontSize: '15px',
                            }}>
                                {props.descriptiveText}
                            </Typography>
                        </CardContent>
                    </Card>
                </motion.div>
            </Grid>
        </>
);
}


export default ServiceBox;
