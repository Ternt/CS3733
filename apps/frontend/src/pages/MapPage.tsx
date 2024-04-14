import { useEffect, useState } from "react";
//import MapCanvas from "../components/Map/MapCanvas.tsx";
import { Grid, Box, Typography } from "@mui/material";
import LocationDropdown from "../components/LocationDropdown.tsx";
import MapCanvas from "../components/Map/MapCanvas.tsx";

export default function MapPage() {
  useEffect(() => {
    document.title = "Map";
  });
  const [startLocation, setStartLocation] = useState("Abrams Conference Room");
  const [endLocation, setEndLocation] = useState("Abrams Conference Room");
  return (
    <Grid
      container
      direction="row"
      justifyContent="stretch"
      alignItems="stretch"
      height='90vh'
    >
      <Grid
        item
        xs={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          fontFamily={"open-sans"}
          variant={"h3"}
          sx={{
            p: 2,
          }}
        >
          Navigate
        </Typography>

        {/* start location dropdown menu */}
        <Box sx={{ p: 2, width: "100%" }}>
          <LocationDropdown
            onChange={(v: string) => {
              setStartLocation(v);
            }}
            value={startLocation}
            filterTypes={["HALL"]}
            label={"Start "}
          />
        </Box>

        {/* end location dropdown menu */}
        <Box sx={{ p: 2, width: "100%" }}>
          <LocationDropdown
            onChange={(v: string) => {
              setEndLocation(v);
            }}
            value={endLocation}
            filterTypes={["HALL"]}
            label={"End "}
          />
        </Box>

        <Typography>*reserved space for other features*</Typography>
      </Grid>

      <Grid item xs={9}>
        <MapCanvas
          defaultFloor={2}
          pathfinding={true}
          startLocation={startLocation}
          endLocation={endLocation}
          onDeselectEndLocation={() => {
            setEndLocation("");
          }}
        />
      </Grid>
    </Grid>
  );
}
