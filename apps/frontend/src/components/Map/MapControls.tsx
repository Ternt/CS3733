import React from "react";
import { Box, SpeedDial, SpeedDialAction } from "@mui/material";
import PinDropIcon from "@mui/icons-material/PinDrop";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";

type MapControlProps = {
  floor: number;
  zoom: number;
  zoomSpeed: number;
  onSetFloorIndex: (floorIndex: number) => void;
  onSetZoom: (zoom: number) => void;
  onResetMap: () => void;
};

const FLOORS = ["L2", "L1", "F1", "F2", "F3"];
const FLOOR_TOOLTIPS = ["Lower 2", "Lower 1", "Floor 1", "Floor 2", "Floor 3"];

export default function MapControls(props: MapControlProps) {
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
        icon={<PinDropIcon />}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        {FLOORS.map((floor, index) => {
          return (
            <SpeedDialAction
              key={floor}
              icon={floor}
              tooltipTitle={FLOOR_TOOLTIPS[index]}
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
