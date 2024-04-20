import {Box, Typography} from "@mui/material";
import React from "react";
import SearchBar from "../../components/SearchBar/searchBar.tsx";
import DirectionsCard from "./DirectionsCard.tsx";

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
                            Looks like the page you're looking for doesn't exist
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
                        <Typography
                            sx={{
                                fontFamily: "Open Sans",
                                fontSize: "1rem",
                                textAlign: "center",
                                fontWeight: 500,
                                color: "#2f2f2f",
                                p: '1rem',
                            }}
                        >
                            Try searching for the page:
                        </Typography>
                      <SearchBar border="3px solid" borderColor="secondary.main" borderRadius="5px"/>
                    </Box>
                </Box>

                <DirectionsCard />

            </Box>
        </>
    );
}
