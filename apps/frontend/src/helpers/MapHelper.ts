import L0 from "../assets/BWHospitalMapsOLD/L2.png";
import L1 from "../assets/BWHospitalMapsOLD/L1.png";
import L2 from "../assets/BWHospitalMapsOLD/F1.png";
import L3 from "../assets/BWHospitalMapsOLD/F2.png";
import L4 from "../assets/BWHospitalMapsOLD/F3.png";
export const MAPS = [L0, L1, L2, L3, L4];
export const FLOOR_IDS = ["L2", "L1", "F1", "F2", "F3"];
export const FLOOR_NAMES = ["Lower 2", "Lower 1", "Floor 1", "Floor 2", "Floor 3"];

export const ZOOM = {
  SPEED: 0.05,
  MAX: 2,
  MIN: 0.25,
};
export const MAP_BASE = {
  WIDTH: 5000,
  HEIGHT: 3400,
};

export function getMapData(){
  const h = window.innerHeight * .9; // 90vh
  const  w = (MAP_BASE.WIDTH / MAP_BASE.HEIGHT) * h;
  return {
    width:w,
    height:h
  };
}

export function FLOOR_NAME_TO_INDEX(f: string) {
  switch (f) {
    case "L2":
      return 0;
    case "L1":
      return 1;
    case "1":
      return 2;
    case "2":
      return 3;
    case "3":
      return 4;
  }
  console.error("No index for " + f);
  return -1;
}

export const FLOOR_OFFSETS = [
  {x: 45, y: -20},
  {x: 20, y: 3},
  {x: 0, y: 0},
  {x: 0, y: 0},
  {x: 0, y: 0},
];
