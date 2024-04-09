import LocationSelectDropdown from "../components/locationSelectDropdown.tsx";
import MapCanvas from "../components/mapCanvas.tsx";
import { useState } from "react";

export default function MapPage() {
  const [startLocation, setStartLocation] = useState("CCONF001L1");
  return (
    <>
      <LocationSelectDropdown
        onChange={(v: string) => {
          setStartLocation(v);
        }}
      />
      <MapCanvas floor={2} startLocation={startLocation} />
    </>
  );
}
