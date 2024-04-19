import {Box} from "@mui/material";

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
                    backgroundColor: "red",
                    height: "75vh",
                    width: "50vw",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                }}>
                    <Box sx={{
                        backgroundColor: "orange",
                        height: "75%",
                        width: "80%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <h1>Uh Oh!</h1>
                        <h4>Looks like the page you're looking for doesn't exist</h4>
                    </Box>
                    <Box sx={{
                        backgroundColor: "gray",
                        height: "20%",
                        width: "70%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <p>Try searching for what you're looking for:</p>
                        <p>Or return to the homepage</p>
                    </Box>
                </Box>

                <Box sx={{
                    backgroundColor: "blue",
                    height: "50vh",
                    width: "40vw",
                }}>
                    <Box sx={{
                        backgroundColor: "orange",
                        height: "20%",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <h3>Looking for directions?</h3>
                    </Box>
                    <Box sx={{
                        backgroundColor: "green",
                        height: "80%",
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                        alignItems: "center",
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
                            backgroundColor: "red",
                            height: "15%",
                            width: "65%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <h3>Try our map!</h3>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    );
}
