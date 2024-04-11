import React from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import VaccinesIcon from "@mui/icons-material/Vaccines";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import LocalFloristIcon from "@mui/icons-material/LocalFlorist";
import BedIcon from "@mui/icons-material/Bed";

export default function OurServices() {
  const navigate = useNavigate();

  const handleMenuItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <>
      <Box sx={{ height: "100vh", width: "100vw", display: "grid" }}>
        <Typography
          sx={{
            fontFamily: "Open Sans",
            fontSize: "50px",
            width: "45vw",
            textAlign: "center",
            fontWeight: 1000,
            color: "black",
            display: "flex",
            padding: "5vh",
          }}
        >
          Our Services
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
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            onClick={() => handleMenuItemClick("/service-request")}
          >
            <Card
              sx={{
                border: "2px solid #ccc",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #999",
                },
                cursor: "pointer",
                height: "30vh",
              }}
            >
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
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            onClick={() => navigate("/medicine-request")}
          >
            <Card
              sx={{
                border: "2px solid #ccc",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #999",
                },
                cursor: "pointer",
                height: "30vh",
              }}
            >
              <CardContent>
                <VaccinesIcon style={{ fontSize: "40px" }} />
                <Typography variant="h5" component="h2">
                  Medicine
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Order Medicine for a Patient
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            onClick={() => navigate("/gift-request")}
          >
            <Card
              sx={{
                border: "2px solid #ccc",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #999",
                },
                cursor: "pointer",
                height: "30vh",
              }}
            >
              <CardContent>
                <CardGiftcardIcon style={{ fontSize: "40px" }} />
                <Typography variant="h5" component="h2">
                  Gifts
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Send a Gift to a Loved One
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            onClick={() => navigate("/flower-request")}
          >
            <Card
              sx={{
                border: "2px solid #ccc",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #999",
                },
                cursor: "pointer",
                height: "30vh",
              }}
            >
              <CardContent>
                <LocalFloristIcon style={{ fontSize: "40px" }} />
                <Typography variant="h5" component="h2">
                  Flowers
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  Send Flowers to a Loved One
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            onClick={() => navigate("/flower-request")}
          >
            <Card
              sx={{
                border: "2px solid #ccc",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #999",
                },
                cursor: "pointer",
                height: "30vh",
              }}
            >
              <CardContent>
                <BedIcon style={{ fontSize: "40px" }} />
                <Typography variant="h5" component="h2">
                  PLACEHOLDER
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  PLACEHOLDER
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            onClick={() => navigate("/flower-request")}
          >
            <Card
              sx={{
                border: "2px solid #ccc",
                borderRadius: "8px",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                  border: "1px solid #999",
                },
                cursor: "pointer",
                height: "30vh",
              }}
            >
              <CardContent>
                <BedIcon style={{ fontSize: "40px" }} />
                <Typography variant="h5" component="h2">
                  PLACEHOLDER
                </Typography>
                <Typography variant="body1" color="textSecondary">
                  PLACEHOLDER
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
