import { getMapData, MAPS} from "./MapHelper.ts";
import {useState} from "react";

// type VectorMapProps = {
//   defaultFloor: number;
//   startLocation: string;
//   pathfinding: boolean;
//   endLocation: string;
//   onDeselectEndLocation?: () => void;
// }

export default function VectorMap(){
  const [pan] = useState({x:0,y:0});
  const [zoom] = useState(2);
  const [selectedFloor] = useState(1);

  const mapData = getMapData();

  return (
    <svg width="100%" height="100%">
      <image
        href={MAPS[selectedFloor]}
        width={mapData.width / zoom}
        height={mapData.height / zoom}
        x={pan.x}
        y={pan.y}
      />
    </svg>
  );
}