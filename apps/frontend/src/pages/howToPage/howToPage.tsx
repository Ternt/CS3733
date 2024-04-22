import Box from "@mui/material/Box";
import {Grid, Typography} from "@mui/material";
import ServiceBox from "../../components/HeroPage/ServiceBox.tsx";
import MapIcon from "@mui/icons-material/Map";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TranslateIcon from '@mui/icons-material/Translate';
import React from "react";


function HowToPage() {

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>

            <Box sx={{
                height: '85vh',
                width: '100%',
                m: '1%',
                backgroundColor: '#d3d3d3',
                borderBlockColor: 'black',
                borderRadius: '23px',
                boxShadow: 3,
            }}>
                <Typography
                    sx={{
                        mt: '1%',
                        fontFamily: "Open Sans",
                        fontSize: "50px",
                        width: "100%",
                        fontWeight: 1000,
                        color: "black",
                        textAlign: "center",
                    }}
                >
                    FAQs
                </Typography>

                <Grid
                    container
                    spacing={2}
                    sx={{
                        mx: '2%',
                        mt: '0.5%',
                        width: '95%',
                        textAlign: "left",
                        alignContent: 'center',
                    }}
                >
                    <ServiceBox path={"/map"}
                                icon={<MapIcon/>}
                                header={"Q: How do I use Pathfinding"}
                                descriptiveText={"A: To use pathfinding, first navigate to the map page. Then select a start and end location from the dropdown menus. Finally, choose a algorithm (A* if you want the optimal path)."}/>


                    <ServiceBox path={"/gift-request"}
                                icon={<CardGiftcardIcon/>}
                                header={"Q: How do I get a gift for a loved one?"}
                                descriptiveText={"A: To get a gift for a loved one, first navigate to the gift page. Then add the desired items to your cart. Finally, click on Submit and complete checking out."}/>

                    <ServiceBox path={"/sanitation"}
                                icon={<CleaningServicesIcon/>}
                                header={"Q: There is a spill in the Garden Cafe, how do I report this?"}
                                descriptiveText={"A: A: To request a translator, first navigate to the sanitation page. Then fill out the relevant information and submit."}/>


                    <ServiceBox path={"/admin"}
                                icon={<SupervisorAccountIcon/>}
                                header={"Q: I am a hospital Admin, how do I see the requests"}
                                descriptiveText={"A: To view all the requests, first login with an admin account and navigate to the admin dashboard page. Then fill out the relevant information and submit"}/>

                    <ServiceBox path={"/"}
                                icon={<TranslateIcon/>}
                                header={"Q: My friend doesn't speak english, How do I get a translator?"}
                                descriptiveText={"A: To request a translator, first navigate to the translator page. Then fill out the relevant information and submit."}/>

                    <ServiceBox path={"/flower-request"}
                                icon={<LocalFloristIcon/>}
                                header={"Q: How do I send flowers to a loved one?"}
                                descriptiveText={"A: To get a gift for a loved one, first navigate to the flower page. Then add the desired items to your cart. Finally, click on Submit and complete checking out."}/>

                </Grid>
            </Box>
        </Box>
    );
}

export default HowToPage;
