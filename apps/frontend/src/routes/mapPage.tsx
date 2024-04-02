import ll1 from "../assets/BWHospitalMaps/00_thelowerlevel1.png";
import MapCanvas, {updateMapLoc} from "../components/mapCanvas.tsx";
import LocationSelectDropdown from "../components/locationSelectDropdown.tsx";

export default function MapPage() {
  return (
    <>
      <LocationSelectDropdown outsideVarSetter={updateMapLoc}/>
      <MapCanvas image={ll1} />
    </>
  );
}
