import React from "react";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel.tsx";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export default function HeroPage() {
  return (
    <>
      <Typography
        sx={{
          fontSize: 100,
          variant: "h1",
          position: "absolute",
          zIndex: 1,
          alignSelf: "center",
          top: "40%",
        }}
      >
        HERO SECTION
      </Typography>
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
