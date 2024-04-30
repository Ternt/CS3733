import {Box, Card, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import mapImage from "../../assets/BWHospitalMaps/02_for_thumbnail.png";
import TranslateTo from "../../helpers/multiLanguageSupport.ts";

export default function DirectionsCard() {
  const navigate = useNavigate();

  return (
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
            color: "secondary.main",
            p: '1rem',
          }}
      >
          {TranslateTo('error.directions')}
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
      <Box
          sx={{
            backgroundColor: "gray",
            height: "70%",
            width: "75%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            overflowY: "hidden",
            borderRadius: "20px",
          }}>
          <img src={mapImage}
               alt="Brigham and Women's hospital map for floor 2"
            style={{
              width: "100%",
            }}/>
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
              fontSize: "1.5rem",
              textAlign: "center",
              fontWeight: 675,
              color: "secondary.main",
              p: '1rem',
            }}
        >
            {TranslateTo("error.tryMap")}
        </Typography>
      </Box>
    </Box>
  </Card>
  );
}
