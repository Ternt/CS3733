import ll1 from "../assets/BWHospitalMaps/00_thelowerlevel1.png";
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
      <MapCanvas image={ll1} startLocation={startLocation} />
    </>
  );
}
