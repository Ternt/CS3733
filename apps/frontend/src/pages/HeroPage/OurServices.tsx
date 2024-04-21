import React from "react";
import { Box, Typography, Grid} from "@mui/material";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import ServiceBox from '../../components/HeroPage/ServiceBox.tsx';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

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
        console.log("test");
        window.open(url, '_blank');
    };

  return (
    <>
      <Box sx={{ height: "90vh", width: "100vw", display: "grid" }}>
        <Typography
          sx={ ServicesHeaderSxTemplate }
        >
            {TranslateTo("ourS.aboutUs")}
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
                          header={TranslateTo("ourS.BWHeader")}
                          descriptiveText={TranslateTo("ourS.BWDesc")}
                          onClick={() => handleExternalLink('https://www.brighamandwomens.org/about-bwh/locations/boston-main-hospital-campus')}/>

              <ServiceBox path={""}
                          icon={<LocationCityIcon/>}
                          header={TranslateTo("ourS.FaulkHeader")}
                          descriptiveText={TranslateTo("ourS.FaulkDesc")}
                          onClick={() => handleExternalLink('https://www.brighamandwomens.org/about-bwh/locations/faulkner-hospital-jamaica-plain')}/>

              <ServiceBox path={"/map"}
                          icon={<MapIcon/>}
                          header={TranslateTo("ourS.MapHeader")}
                          descriptiveText={TranslateTo("ourS.MapDesc")}/>


              <ServiceBox path={"/gift-request"}
                          icon={<CardGiftcardIcon/>}
                          header={TranslateTo("ourS.GiftHeader")}
                          descriptiveText={TranslateTo("ourS.GiftDesc")}/>

              <ServiceBox path={"/flower-request"}
                          icon={<LocalFloristIcon/>}
                          header={TranslateTo("ourS.FlwrHeader")}
                          descriptiveText={TranslateTo("ourS.FlwrDesc")}/>

          </Grid>
      </Box>
    </>
  );
}
