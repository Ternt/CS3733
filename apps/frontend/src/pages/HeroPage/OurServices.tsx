import React from "react";
import {Box, Typography, Grid} from "@mui/material";
import ServiceBox from '../../components/HeroPage/ServiceBox.tsx';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import MapIcon from '@mui/icons-material/Map';
import TranslateTo from "../../helpers/multiLanguageSupport.ts";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import GroupIcon from '@mui/icons-material/Group';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

export default function OurServices() {

    const ServicesHeaderSxTemplate = {
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
            <Box sx={{height: "90vh", width: "100vw", display: "grid"}}>
                <Typography
                    sx={ServicesHeaderSxTemplate}
                >
                    Additional Information
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

                    <ServiceBox path={"/"}
                                icon={<GroupIcon/>}
                                header={"About Us"}
                                descriptiveText={"• Learn more about the team how created this web app"}/>

                    <ServiceBox path={"/"}
                                icon={<PhoneIphoneIcon/>}
                                header={"IOS App"}
                                descriptiveText={"• Checkout our IOS App"}/>

                    <ServiceBox path={"/howTo"}
                                icon={<QuestionMarkIcon/>}
                                header={"FAQ"}
                                descriptiveText={"• Answers to frequently asked questions and how to guides"}/>

                    <ServiceBox path={"/"}
                                icon={<HandshakeIcon/>}
                                header={"Credits"}
                                descriptiveText={"• Special Thanks to the people who made this project possible"}/>
                </Grid>
            </Box>
        </>
    );
}
