import React from "react";
import { Box, Typography, Grid} from "@mui/material";
// import { useNavigate } from "react-router-dom";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import BedIcon from "@mui/icons-material/Bed";
import ServiceBox from '../../components/HeroPage/ServiceBox.tsx';

export default function OurServices() {
  // const navigate = useNavigate();

  // const handleMenuItemClick = (path: string) => {
  //   navigate(path);
  // };

  const ServicesHeaderSxTemplate ={
      fontFamily: "Open Sans",
      fontSize: "50px",
      width: "45vw",
      textAlign: "center",
      fontWeight: 1000,
      color: "black",
      display: "flex",
      padding: "5vh",
  };

  return (
    <>
      <Box sx={{ height: "100vh", width: "100vw", display: "grid" }}>
        <Typography
          sx={ ServicesHeaderSxTemplate }
        >
          Our Services
        </Typography>
          <Grid
              container
              spacing={2}
              sx={{
                  padding: "5vh",
                  position: "absolute",
                  top: "115vh",
              }}
          >
              <ServiceBox path={"/service-request"}
                          icon={<HomeRepairServiceIcon/>}
                          header={"Maintenance"}
                          descriptiveText={"Request Maintenance"}/>
              <ServiceBox path={"medicine-request"}
                          icon={<VaccinesIcon/>}
                          header={"Medicine"}
                          descriptiveText={"Order Medicine for a Patient"} />
              <ServiceBox path={"/gift-request"}
                          icon={<CardGiftcardIcon/>}
                          header={"Gift Request"}
                          descriptiveText={"Send a Gift to a Loved One"}/>
              <ServiceBox path={"/flower-request"}
                          icon={<LocalFloristIcon/>}
                          header={"Flowers"}
                          descriptiveText={"Send Flowers to a Loved One"}/>
             <ServiceBox path={"/flower-request"}
                         icon={<BedIcon/>}
                         header={"PLACEHOLDER"}
                         descriptiveText={"PLACEHOLDER"}/>
              <ServiceBox path={"/flower-request"}
                          icon={<BedIcon/>}
                          header={"PLACEHOLDER"}
                          descriptiveText={"PLACEHOLDER"}/>
          </Grid>
      </Box>
    </>
  );
}
