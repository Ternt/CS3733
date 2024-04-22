import React, {useEffect, useState} from "react";
import {Box, Fab, IconButton, Snackbar, ToggleButton, ToggleButtonGroup} from "@mui/material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import {FLOOR_IDS, FLOOR_NAMES} from "../../helpers/MapHelper.ts";
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import TimelineIcon from '@mui/icons-material/Timeline';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

type MapControlProps = {
  floor: number;
  zoom: number;
  zoomSpeed: number;
  onSetFloorIndex: (floorIndex: number) => void;
  onSetZoom: (zoom: number) => void;
  onResetMap: () => void;
  viewMode: string;
  onSetViewMode: (m:string)=>void;
};

export default function MapControls(props: MapControlProps) {
  const [notification, setNotification] = useState('');

  useEffect(() => {
    setNotification("Viewing "+ FLOOR_NAMES[props.floor]);
  }, [props.floor]);


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
      <Box
        sx={{
          display:'flex',
          flexDirection:'column-reverse',
          justifyContent:'flex-start',
          alignItems:'flex-end',
          gap:1,
        }}
      >
        <br/>
        <Fab
          size={'medium'}
          sx={{
            bgcolor:'white',
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            props.onSetZoom(props.zoom - props.zoomSpeed);
          }}
        >
          <ZoomInIcon/>
        </Fab>
        <Fab
          size={'medium'}
          sx={{
            bgcolor:'white',
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            props.onSetZoom(props.zoom + props.zoomSpeed);
          }}
        >
          <ZoomOutIcon/>
        </Fab>
        <Fab
          size={'medium'}
          sx={{
            bgcolor:'white',
          }}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            props.onResetMap();
          }}
        >
          <CenterFocusWeakIcon/>
        </Fab>
        <br/>
        {FLOOR_IDS.map((floor, index) => {
          return (
            <Fab
              size={'medium'}
              sx={{
                bgcolor:'white',
              }}
              key={floor}
              onClick={() => {
                props.onSetFloorIndex(index);
              }}
            >
              {floor}
            </Fab>
          );
        })}
      </Box>
        <ToggleButtonGroup
          value={props.viewMode}
          exclusive
          onChange={(e,n)=>{
            if(n===null)return;
            props.onSetViewMode(n);
          }}
          sx={{
            bgcolor:'white'
          }}
        >
          <ToggleButton value="normal"><TimelineIcon /></ToggleButton>
          <ToggleButton value="edit"><EditIcon /></ToggleButton>
          <ToggleButton value="heatmap"><LocalFireDepartmentIcon /></ToggleButton>
        </ToggleButtonGroup>
        <Snackbar
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          open={notification !== ''}
          onClose={() => {
            setNotification('');
          }}
          autoHideDuration={5000}
          message={notification}
          key={"Notif"}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{p: 0.5}}
              onClick={() => {
                setNotification('');
              }}
            >
              <CloseIcon/>
            </IconButton>
          }
        />
    </Box>
  );
}
