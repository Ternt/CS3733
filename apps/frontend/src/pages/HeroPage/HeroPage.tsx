import React from "react";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel.tsx";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

export default function HeroPage() {
  const navigate = useNavigate();
  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Box
        sx={{
          position: "absolute",
          zIndex: 1,
          alignSelf: "center",
          bg: "black",
          display: "flex",
          justifyContent: "center",
          top: "30%",
        }}
      >
        <Typography
          sx={{
            fontSize: 100,
            fontFamily: "Inria Serif",
            variant: "h1",
            padding: "8%",
            paddingBottom: "15%",
            bgcolor: "#00000070",
            textAlign: "center",
            width: "fit-content",
            letterSpacing: "0.3em",
            borderRadius: "10px",
          }}
        >
          Welcome
        </Typography>

        <Button
          onClick={() => handleMenuItemClick("/map")}
          sx={{
            position: "absolute",
            background: "#f6bd38",
            zIndex: 2,
            display: "flex",
            top: "70%",
            height: "15%",
            width: "40%",
            color: "black",

            "&:hover": {
              background: "#ffd168",
              color: "black",
            },
          }}
        >
          Find Your Way <ArrowForwardIcon />
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ImageCarousel />
      </Box>
    </>
  );
}
