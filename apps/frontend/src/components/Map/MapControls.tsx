import React, {useState} from "react";
import {Box, SpeedDial, SpeedDialAction, Typography} from "@mui/material";
//import PinDropIcon from "@mui/icons-material/PinDrop";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import {FLOOR_IDS, FLOOR_NAMES} from "../../helpers/MapHelper.ts";

type MapControlProps = {
  floor: number;
  zoom: number;
  zoomSpeed: number;
  onSetFloorIndex: (floorIndex: number) => void;
  onSetZoom: (zoom: number) => void;
  onResetMap: () => void;
};

export default function MapControls(props: MapControlProps) {
  const [floorSelectorOpen, setFloorSelectorOpen] = useState(false);
  const [timeOfLastToggle, setTimeOfLastToggle] = useState(Date.now());

  const COOLDOWN = 600;

  function toggleFloorSelector(){
    if(Date.now() - timeOfLastToggle > COOLDOWN){
      setTimeOfLastToggle(Date.now());
      setFloorSelectorOpen(!floorSelectorOpen);
    }
  }

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
      }}
    >
      <SpeedDial
        ariaLabel="Map controls"
        icon={<Typography variant={"subtitle1"}> {FLOOR_IDS[props.floor]}</Typography>}
        open={floorSelectorOpen}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          toggleFloorSelector();
        }}
        onMouseEnter={() => {
          toggleFloorSelector();
        }}
        onMouseLeave={() => {
          setFloorSelectorOpen(false);
        }}
      >
        {FLOOR_IDS.map((floor, index) => {
          return (
            <SpeedDialAction
              key={floor}
              icon={floor}
              tooltipTitle={FLOOR_NAMES[index]}
              onClick={() => {
                props.onSetFloorIndex(index);
              }}
            />
          );
        })}
      </SpeedDial>
      <SpeedDial
        ariaLabel="Map controls"
        icon={<ZoomInIcon />}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          props.onSetZoom(props.zoom - props.zoomSpeed);
        }}
      />
      <SpeedDial
        ariaLabel="Map controls"
        icon={<ZoomOutIcon />}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          props.onSetZoom(props.zoom + props.zoomSpeed);
        }}
      />
      <SpeedDial
        ariaLabel="Map controls"
        icon={<CenterFocusWeakIcon />}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          props.onResetMap();
        }}
      />
    </Box>
  );
}
