import React, {useRef, useState} from "react";
import {Box, Button, Typography} from "@mui/material";
import heroImage from "../../assets/baby.jpg";
import heroImage2 from "../../assets/baby2.jpg";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import OurServices from "./OurServices.tsx";
import {useNavigate} from "react-router-dom";
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

export default function HeroPage() {
    const heroPage2Ref = useRef<HTMLDivElement | null>(null);
    const [wong, setWong] = useState(false);

    const handleLearnMoreClick = () => {
        if (heroPage2Ref.current) {
            heroPage2Ref.current.scrollIntoView({behavior: "smooth"});
        }
    };

    const navigate = useNavigate();
    const handleMenuItemClick = (path: string) => {
        navigate(path);
    };

    function hideDisclaimerBox() {
      setBoxDisplay(false);
    }

    const [boxDisplay, setBoxDisplay] = useState(true);


    return (
        <Box>
          {boxDisplay && <Box
                sx = {{
                    position: "absolute",
                    translate: "15vw 1vh",
                    width: '70%',
                    p: '1rem',
                    zIndex: "5",
                    border: "3px solid #cc0000",
                    backgroundColor: "red",
                    opacity: 0.5,
                    borderRadius: "10px",
                    "&:hover": {opacity: 1},
                }}
                onClick={hideDisclaimerBox}
            >
                <Typography
                    variant = "caption"
                    sx = {{
                        display: 'inline-block',
                        fontSize: '1rem',
                        lineHeight: '1.4',
                        color: "white",
                    }}
                >
                    {TranslateTo("Disclaimer")}
                </Typography>

            </Box>}
            <Box
                component="img"
                className={"logo"}
                src={
                  wong ? heroImage2 : heroImage
                }
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
                    {TranslateTo("heroP.findway")}
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
                            minWidth: "15rem",
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
                            {TranslateTo("heroP.map")}
                        </Typography>
                    </Button>
                    <Button
                        key="learnMore"
                        onClick={handleLearnMoreClick}
                        sx={{
                            minWidth: "15rem",
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
                            {TranslateTo("heroP.learnMore")}
                        </Typography>
                        <KeyboardDoubleArrowDownIcon/>
                    </Button>
                </Box>
            </Box>
            <Box ref={heroPage2Ref}>
                <OurServices/>
            </Box>
            <Box
              sx={{
                position:'absolute',
                width:'300px',
                height:'300px',
                top:'50%',
                left:'50%',
                transform:'translate(0%,-50%)'
              }}
              onMouseOver={()=>{
                setWong(true);
              }}
              onMouseLeave={()=>{
                setWong(false);
              }}
            >

            </Box>
        </Box>
    );
}
