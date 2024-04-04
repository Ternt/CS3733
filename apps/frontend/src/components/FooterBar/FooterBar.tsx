import "./FooterBar.scss";
import MatIcon from "../MatIcon/MatIcon.tsx";
import { Button, InputType } from "../Inputs/Inputs.tsx";
import { useNavigate } from "react-router-dom";

export default function FooterBar() {
  const navigate = useNavigate();

  return (
    <footer className="footer" onClick={() => navigate("/")}>
      <MatIcon className={"build_circle"} icon={"build_circle"} />
      <Button onClick={() => navigate("/")} type={InputType.Blue}>
        Request Service
      </Button>
    </footer>
  );
}
