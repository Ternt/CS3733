import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { useNavigate } from "react-router-dom";

type ServiceBoxProps = {
    gridPath: string,
    header: string,
    descriptiveText: string,
    };

function ServiceBox(props: ServiceBoxProps) {
    const navigate = useNavigate();

    const handleMenuItemClick = (path: string) => {
        navigate(path);
    };


    return (
        <>
        <Grid
            container
            spacing={2}
            sx={{
                padding: "5vh",
                position: "absolute",
                top: "115vh",
            }}
        >
            <Grid
                item
                xs={12}
                sm={6}
                md={4}
                onClick={() => handleMenuItemClick(props.gridPath)}
            >
                <Card
                    sx={{
                        border: "2px solid #ccc",
                        borderRadius: "8px",
                        transition: "all 0.2s ease-in-out",

                        "&:hover": {
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            border: "1px solid #999",
                            "& > .btmstripe": {
                                backgroundColor: "#f6bd38",
                            },
                        },
                        cursor: "pointer",
                        height: "30vh",
                        position: "relative",
                    }}
                >
                    <Box
                        className={"btmstripe"}
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            width: "100%",
                            height: "10%",
                            backgroundColor: "#012d5a",
                            transition: "background-color 0.2s ease-in-out",
                        }}
                    />
                    <CardContent>
                        <HomeRepairServiceIcon style={{ fontSize: "40px" }} />
                        <Typography variant="h5" component="h2">
                            Maintenance
                        </Typography>
                        <Typography variant="body1" color="textSecondary">
                            Request Maintenance
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </>
    );
}


export default ServiceBox;
