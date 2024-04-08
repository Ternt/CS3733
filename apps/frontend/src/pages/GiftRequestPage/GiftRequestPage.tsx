import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ItemCard from "../../components/Card/ItemCard.tsx";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";

function GiftRequestPage() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          bgcolor: "#FFFFFF",
          width: { xs: "60vw", md: "30vw" },
          height: "100vh",
          position: "sticky",
          top: 0,
          left: 0,
        }}
      >
        <Box>
          <Typography textAlign={"center"} variant={"h3"}>
            Order Flowers
          </Typography>
        </Box>
        <Box p={3}>
          <Typography variant={"h6"}>
            Example Text Example Text Example Text Example Text Example Text
            Example Text Example Text Example Text
          </Typography>
        </Box>
        <Box>
          <Button
            type="submit" // Ensure the button submits the form
            variant="contained"
            color="secondary"
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          width: { xs: "100vw", md: "70vw" },
          bgcolor: "#F1F1F1",
        }}
      >
        <Grid container>
          {Array.from(Array(25)).map((_, index) => (
            <ItemCard
              imageURL="../../src/assets/roses.jpg.webp"
              title={"Roses " + index}
              price="$99"
              description="this is a description of roses"
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default GiftRequestPage;
