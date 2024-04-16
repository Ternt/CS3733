import { useEffect, useState } from "react";
//import MapCanvas from "../components/Map/MapCanvas.tsx";
import {Grid, Box, Typography, TextField} from "@mui/material";
import LocationDropdown from "../components/LocationDropdown.tsx";
import MapCanvas from "../components/Map/MapCanvas.tsx";
import NaturalLanguageDirection from "../components/NaturalLanguageDirection/NaturalLanguageDirection.tsx";
import MenuItem from "@mui/material/MenuItem";

export default function MapPage() {
  useEffect(() => {
    document.title = "Map";
  });

  const algos = [
    {title:'A-Star', api:'astar', helper:'The quickest route'},
    {title:'Breadth First', api:'bfs', helper:'A decent route'},
    {title:'Depth First', api:'dfs', helper:'The scenic route'},
  ];
  const [startLocation, setStartLocation] = useState("Abrams Conference Room");
  const [endLocation, setEndLocation] = useState("Abrams Conference Room");
  const [searchAlgorithm, setSearchAlgorithm] = useState(0);
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
        {/* Algorithm choose */}
        <Box sx={{ p: 2, width: "100%" }}>
          <TextField
            select
            onChange={(e)=>{
              setSearchAlgorithm(parseInt(e.target.value));
            }}
            sx={{
              width:'100%'
            }}
            value={searchAlgorithm}
            label={"Algorithm "}
            helperText={algos[searchAlgorithm].helper}
          >
            {
              algos.map((a, i)=><MenuItem key={a.api} value={i}>{a.title}</MenuItem>)
            }
          </TextField>
        </Box>
        <Typography>*reserved space for other features*</Typography>
          <Typography>{startLocation}</Typography>
          <Typography>{endLocation}</Typography>
          <NaturalLanguageDirection startLocation={startLocation} endLocation={endLocation} />


      </Grid>

      <Grid item xs={9}>
        <MapCanvas
          defaultFloor={2}
          pathfinding={algos[searchAlgorithm].api}
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
