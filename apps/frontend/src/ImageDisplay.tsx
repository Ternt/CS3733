import lowerlevel1 from "../public/maps/map_level_1.png";
import { Link } from "react-router-dom";

function ImageDisplay() {
  return (
    <div>
      <h1>L1 Floor Map</h1>
      <img
        src={lowerlevel1}
        alt="Your Image"
        style={{ maxWidth: "100%", height: "auto" }}
      />
      <br />
      <Link to="/home">Return to Homepage</Link>
    </div>
  );
}

export default ImageDisplay;
