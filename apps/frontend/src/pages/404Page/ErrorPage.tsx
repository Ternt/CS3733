import {Box, Button, Card, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

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
                                color: "#012d5a",
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
                        width: "70%",
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
                        <Button>Filler Button</Button>
                    </Box>
                </Box>

                <Card variant="outlined"
                    onClick={() => navigate("/map")}
                    sx={{
                    height: "50vh",
                    width: "40vw",
                    p: "1rem",
                    backgroundColor: "#f1f1f1",
                      "&:hover": {
                        cursor: "pointer",
                        boxShadow: 4,
                      }
                }}>
                    <Box sx={{
                        height: "20%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <Typography
                            sx={{
                                fontFamily: "Open Sans",
                                fontSize: "2rem",
                                textAlign: "center",
                                fontWeight: 1000,
                                color: "#012d5a",
                                p: '1rem',
                            }}
                        >
                            Looking For Directions?
                        </Typography>
                    </Box>
                    <Box sx={{
                        height: "80%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        border: "solid 5px #012d5a",
                        borderRadius: "10px",
                    }}>
                        <Box sx={{
                            backgroundColor: "gray",
                            height: "70%",
                            width: "75%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <h2>Map Image Here</h2>
                        </Box>
                        <Box sx={{
                            height: "15%",
                            width: "65%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <Typography
                                sx={{
                                    fontFamily: "Open Sans",
                                    fontSize: "2rem",
                                    textAlign: "center",
                                    fontWeight: 675,
                                    color: "#012d5a",
                                    p: '1rem',
                                }}
                            >
                                Try our map!
                            </Typography>
                        </Box>
                    </Box>
                </Card>
            </Box>
        </>
    );
}
