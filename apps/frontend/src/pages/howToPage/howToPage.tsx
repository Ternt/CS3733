import Box from "@mui/material/Box";
import {Grid, Typography} from "@mui/material";
import ServiceBox from "../../components/HeroPage/ServiceBox.tsx";
import MapIcon from "@mui/icons-material/Map";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import TranslateIcon from '@mui/icons-material/Translate';
import React, { useEffect } from "react";
import FooterBar from "../../components/Footerbar/footer.tsx";
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

function HowToPage() {
    useEffect(() => {
      document.title = "FAQ";
    });

    return (
      <>
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
                                header={TranslateTo("faq.PathQ")}
                                descriptiveText={TranslateTo("faq.PathA")}/>

                    <ServiceBox path={"/gift-request"}
                                icon={<CardGiftcardIcon/>}
                                header={TranslateTo("faq.GiftQ")}
                                descriptiveText={TranslateTo("faq.GiftA")}/>

                    <ServiceBox path={"/sanitation"}
                                icon={<CleaningServicesIcon/>}
                                header={TranslateTo("faq.CleanQ")}
                                descriptiveText={TranslateTo("faq.CleanA")}/>


                    <ServiceBox path={"/admin"}
                                icon={<SupervisorAccountIcon/>}
                                header={TranslateTo("faq.AdminQ")}
                                descriptiveText={TranslateTo("faq.AdminA")}/>

                    <ServiceBox path={"/interpreter"}
                                icon={<TranslateIcon/>}
                                header={TranslateTo("faq.LangQ")}
                                descriptiveText={TranslateTo("faq.LangA")}/>

                    <ServiceBox path={"/flower-request"}
                                icon={<LocalFloristIcon/>}
                                header={TranslateTo("faq.FlwrQ")}
                                descriptiveText={TranslateTo("faq.FlwrA")}/>
                </Grid>
            </Box>
        </Box>
        <FooterBar />
        </>
    );
}

export default HowToPage;
