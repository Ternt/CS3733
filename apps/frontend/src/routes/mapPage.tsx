import ll1 from "../assets/BWHospitalMaps/00_thelowerlevel1.png";
import LocationSelectDropdown from "../components/locationSelectDropdown.tsx";
import MapCanvas from "../components/mapCanvas.tsx";
import { useEffect, useState } from "react";

type mapPageProps = {
  title: string;
};

export default function MapPage(props: mapPageProps) {
  useEffect(() => {
    document.title = props.title;
  });
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
