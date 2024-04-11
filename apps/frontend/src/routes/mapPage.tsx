import LocationSelectDropdown from "../components/locationSelectDropdown.tsx";
import { useEffect, useState } from "react";
import MapCanvas2 from "../components/mapCanvas2.tsx";

export default function MapPage() {
  useEffect(() => {
    document.title = "Map";
  });
  const [startLocation, setStartLocation] = useState("CCONF001L1");
  const [endLocation, setEndLocation] = useState("CCONF001L1");
  return (
    <>
      <LocationSelectDropdown
        onChange={(v: string) => {
          setStartLocation(v);
        }}
        label={"Start "}
      />
      <LocationSelectDropdown
        onChange={(v: string) => {
          setEndLocation(v);
        }}
        label={"End "}
      />
      <MapCanvas2
        defaultFloor={2}
        pathfinding={true}
        startLocation={startLocation}
        endLocation={endLocation}
      />
    </>
  );
}
