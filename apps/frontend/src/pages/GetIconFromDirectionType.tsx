import {directionTypes} from "../components/NaturalLanguageDirection/naturalLanguageDirection.tsx";
import StraightIcon from "@mui/icons-material/Straight";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import TurnRightIcon from "@mui/icons-material/TurnRight";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ElevatorOutlinedIcon from "@mui/icons-material/ElevatorOutlined";
import StairsOutlinedIcon from "@mui/icons-material/StairsOutlined";
import * as React from "react";

export function getIconFromDirectionType(t: directionTypes) {
  switch (t) {
    case directionTypes.STRAIGHT:
      return <StraightIcon/>;
    case directionTypes.LEFT:
      return <TurnLeftIcon/>;
    case directionTypes.RIGHT:
      return <TurnRightIcon/>;
    case directionTypes.START:
      return <MyLocationIcon/>;
    case directionTypes.END:
      return <PinDropOutlinedIcon/>;
    case directionTypes.HELP:
      return <HelpOutlineOutlinedIcon/>;
    case directionTypes.ELEVATOR:
      return <ElevatorOutlinedIcon/>;
    case directionTypes.STAIRS:
      return <StairsOutlinedIcon/>;
  }
}