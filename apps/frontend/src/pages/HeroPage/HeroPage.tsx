import React, {useRef} from "react";
import {Box, Button, Typography} from "@mui/material";
import logo from "../../assets/baby.jpg";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import OurServices from "./OurServices.tsx";
import {useNavigate} from "react-router-dom";

export default function HeroPage() {
    const heroPage2Ref = useRef<HTMLDivElement | null>(null);

    const handleLearnMoreClick = () => {
        if (heroPage2Ref.current) {
            heroPage2Ref.current.scrollIntoView({behavior: "smooth"});
        }
    };

    const navigate = useNavigate();
    const handleMenuItemClick = (path: string) => {
        navigate(path);
    };


    return (
        <>
            <Box
                component="img"
                className={"logo"}
                src={logo}
                alt={"logo"}
                sx={{
                    width: "100vw",
                    height: "90vh",
                    objectFit: "cover",
                    overflow: "hidden",
                    filter: "brightness(45%) blur(1px)",
                    padding: 0,
                }}
            ></Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: "35vh",
                    left: "2vw",
                }}
            >
                <Typography
                    sx={{
                        fontFamily: "Open Sans",
                        fontSize: "5rem",
                        textAlign: "left",
                        fontWeight: 1000,
                        color: "#f1f1f1",
                        p: '1rem',
                    }}
                >
                    Find Your Way
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: {xs: 'column', sm: 'row'},
                        flexWrap: 'wrap',
                        gap: '3rem',
                        marginLeft: '3%'
                    }}
                >
                    <Button
                        key="Map"
                        onClick={() => {handleMenuItemClick("/map");}}
                        sx={{
                            width: "40%",
                            px: '2rem',
                            color: "black",
                            transition: "all 0.2s ease-in-out",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#f6bd38",
                            "&:hover": {background: "#f8cd69", color: "black"},
                        }}
                    >
                        <Typography variant="h6" mr={1}>
                            Map
                        </Typography>
                    </Button>
                    <Button
                        key="learnMore"
                        onClick={handleLearnMoreClick}
                        sx={{
                            width: "40%",
                            px: '2rem',
                            py: '1rem',
                            color: "white",
                            transition: "all 0.2s ease-in-out",
                            fontSize: "20px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "#012d5a",
                            "&:hover": {background: "#1a426a", color: "white"},
                        }}
                    >
                        <Typography variant="h6" mr={1}>
                            Learn More
                        </Typography>
                        <KeyboardDoubleArrowDownIcon/>
                    </Button>
                </Box>
            </Box>
            <Box ref={heroPage2Ref}>
                <OurServices/>
            </Box>
        </>
    );
}
