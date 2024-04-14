import React, { useRef } from "react";
import { Box, Button, Typography } from "@mui/material";
import logo from "../../assets/baby.jpg";
import { useNavigate } from "react-router-dom";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import OurServices from "./OurServices.tsx";

export default function HeroPage() {
  const navigate = useNavigate();
  const heroPage2Ref = useRef<HTMLDivElement | null>(null);

  const handleLearnMoreClick = () => {
    if (heroPage2Ref.current) {
      heroPage2Ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

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
          height: "100vh",
          objectFit: "cover",
          overflow: "hidden",
          filter: "brightness(45%) blur(1px)",
          padding: 0,
        }}
      ></Box>
      <Box
        sx={{
          position:'absolute',
          top: "35vh",
          left: "6vw",
        }}
      >
        <Typography
          sx={{
            fontFamily: "Open Sans",
            fontSize: "5rem",
            textAlign: "left",
            fontWeight: 1000,
            color: "#f1f1f1",
            p:'1rem',
          }}
        >
          Aware Because<br/>We Care.
        </Typography>
        <Box
          sx={{
            display:'flex',
            flexDirection:{xs:'column', sm:'row'},
            flexWrap:'wrap',
            gap:'1rem'
          }}
        >
          <Button
            key={"login"}
            onClick={() => handleMenuItemClick("/login")}
            sx={{
              color: "black",
              transition: "all 0.2s ease-in-out",
              fontSize: "20px",
              display: "block",
              width: "fit-content",
              px:'2rem',
              bgcolor: "#f6bd38",
              "&:hover": { background: "#f9d070", color: "black" },
            }}
          >
            {"login"}
          </Button>
          <Button
            key="learnMore"
            onClick={handleLearnMoreClick}
            sx={{
              width: "fit-content",
              px:'2rem',
              color: "white",
              transition: "all 0.2s ease-in-out",
              fontSize: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#012d5a",
              "&:hover": { background: "#1a426a", color: "white" },
            }}
          >
            <Typography variant="body1" mr={1}>
              Learn More
            </Typography>
            <KeyboardDoubleArrowDownIcon />
          </Button>
        </Box>
      </Box>
      <Box ref={heroPage2Ref}>
        <OurServices />
      </Box>
    </>
  );
}
