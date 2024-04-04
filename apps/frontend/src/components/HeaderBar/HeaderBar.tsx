import { Link } from "react-router-dom";
import MatIcon from "../MatIcon/MatIcon.tsx";
import logo from "../../assets/logo.png";
import "./HeaderBar.scss";

export default function HeaderBar() {
  return (
    <header className="header">
      <Link className="icon" to="/login">
        <MatIcon className={"account_circle"} icon={"account_circle"} />
      </Link>
      <img src={logo} alt={"B&W Hospital Logo"} />
    </header>
  );
}
