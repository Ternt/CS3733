import React from "react";
import { Box, Typography, Grid} from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ServiceBox from '../../components/HeroPage/ServiceBox.tsx';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';

export default function OurServices() {

  const ServicesHeaderSxTemplate ={
      fontFamily: "Open Sans",
      fontSize: "50px",
      width: "100%",
      textAlign: "center",
      fontWeight: 1000,
      color: "black",
      display: "flex",
      padding: "5vh",
  };

    const handleExternalLink = (url: string) => {
        window.open(url, '');
    };

  return (
    <>
      <Box sx={{ height: "90vh", width: "100vw", display: "grid" }}>
        <Typography
          sx={ ServicesHeaderSxTemplate }
        >
            About Us
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
              <ServiceBox path={""}
                          icon={<LocationCityIcon/>}
                          header={"Brigham and Women's Hospital"}
                          descriptiveText={"• 75 Francis Street, Boston, MA 02115\n• 617-732-5500"}
                          onClick={() => handleExternalLink('https://www.brighamandwomens.org/about-bwh/locations/boston-main-hospital-campus')}/>

              <ServiceBox path={""}
                          icon={<LocationCityIcon/>}
                          header={"Brigham and Women's Faulkner Hospital"}
                          descriptiveText={"• 1153 Centre Street, Jamacia Plain, MA 02130\n • 617-983-7000"}
                          onClick={() => handleExternalLink('https://www.brighamandwomens.org/about-bwh/locations/faulkner-hospital-jamaica-plain')}/>

              <ServiceBox path={"/map"}
                          icon={<MapIcon/>}
                          header={"Map"}
                          descriptiveText={"• Find your way to any location within the hospital"}/>


              <ServiceBox path={"/gift-request"}
                          icon={<CardGiftcardIcon/>}
                          header={"Send a Gift"}
                          descriptiveText={"• Get your loved one a customized gift that will be delivered directly to their room"}/>

              <ServiceBox path={"/flower-request"}
                          icon={<LocalFloristIcon/>}
                          header={"Buy Flowers"}
                          descriptiveText={"• Send Flowers directly to the room of a loved one"}/>

          </Grid>
      </Box>
    </>
  );
}
