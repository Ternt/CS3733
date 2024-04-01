import React from "react";
import ll1 from "../assets/BWHospitalMaps/00_thelowerlevel1.png";
import MapCanvas from "../components/mapCanvas.tsx";

export default function MapPage() {
  return (
    <>
      <h1>This is the pathfinding page. There's only one map here for now</h1>
      <MapCanvas image={ll1} />
    </>
  );
}
