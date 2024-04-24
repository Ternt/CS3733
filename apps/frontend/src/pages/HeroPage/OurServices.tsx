import React from "react";
import {Box, Typography, Grid} from "@mui/material";
import ServiceBox from '../../components/HeroPage/ServiceBox.tsx';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import TranslateTo from "../../helpers/multiLanguageSupport.ts";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import GroupIcon from '@mui/icons-material/Group';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';

export default function OurServices() {

    const ServicesHeaderSxTemplate = {
        fontFamily: "sans-serif",
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
                                header={TranslateTo("ourS.BWHeader")}
                                descriptiveText={TranslateTo("ourS.BWDesc")}
                                onClick={() => handleExternalLink('https://www.brighamandwomens.org/about-bwh/locations/boston-main-hospital-campus')}/>

                    <ServiceBox path={""}
                                icon={<LocationCityIcon/>}
                                header={TranslateTo("ourS.FaulkHeader")}
                                descriptiveText={TranslateTo("ourS.FaulkDesc")}
                                onClick={() => handleExternalLink('https://www.brighamandwomens.org/about-bwh/locations/faulkner-hospital-jamaica-plain')}/>

                    <ServiceBox path={"/"}
                                icon={<GroupIcon/>}
                                header={TranslateTo("ourS.aboutUs")}
                                descriptiveText={TranslateTo("ourS.aboutUsDesc")}/>

                    <ServiceBox path={"/"}
                                icon={<PhoneIphoneIcon/>}
                                header={TranslateTo("ourS.IOS")}
                                descriptiveText={TranslateTo("ourS.IOSDesc")}/>

                    <ServiceBox path={"/howTo"}
                                icon={<QuestionMarkIcon/>}
                                header={TranslateTo("ourS.FAQ")}
                                descriptiveText={TranslateTo("ourS.FAQDesc")}/>

                    <ServiceBox path={"/credits"}
                                icon={<HandshakeIcon/>}
                                header={TranslateTo("ourS.Credits")}
                                descriptiveText={TranslateTo("ourS.creditsDesc")}/>
                </Grid>
            </Box>
        </>
    );
}
