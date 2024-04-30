import {Box, Typography} from "@mui/material";
import React from "react";
import DirectionsCard from "./DirectionsCard.tsx";
import FooterBar from "../../components/Footerbar/footer.tsx";
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

export default function ErrorPage() {
    return (
        <>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: "2%",
                alignItems: 'center',
                height: "90vh",
            }}>
                <Box sx={{
                    height: "75vh",
                    width: "50vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Box sx={{
                        height: "75%",
                        width: "80%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                      <img src="https://pngimg.com/uploads/stethoscope/stethoscope_PNG6.png"
                           alt="Stethoscope included for stylistic purposes"
                        style={{
                          position: "absolute",
                          zIndex: "-1",
                          opacity: "10%",
                          height: "100%",
                          translate: "-15vw",
                          transform: "scaleX(-1)"
                        }}/>
                        <Typography
                            sx={{
                                fontFamily: "Open Sans",
                                fontSize: "6rem",
                                textAlign: "center",
                                fontWeight: 600,
                                color: "secondary.main",
                                p: '1rem',
                                pb: 0,
                            }}
                        >
                            Uh Oh!
                        </Typography>
                        <Typography
                            sx={{
                                fontFamily: "Open Sans",
                                fontSize: "2rem",
                                textAlign: "center",
                                fontWeight: 250,
                                color: "#2f2f2f",
                                p: '1rem',
                                pt: 0,
                            }}
                        >
                            {TranslateTo("error.pageNoExist")}
                        </Typography>
                    </Box>
                    <Box sx={{
                        height: "20%",
                        width: "90%",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>

                    </Box>
                </Box>

                <DirectionsCard />

            </Box>
          <FooterBar />
        </>
    );
}
