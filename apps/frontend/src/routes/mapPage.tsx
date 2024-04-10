import LocationSelectDropdown from "../components/locationSelectDropdown.tsx";
import MapCanvas2 from "../components/mapCanvas2.tsx";
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
      <MapCanvas2 defaultFloor={2} startLocation={startLocation} />
    </>
  );
}
