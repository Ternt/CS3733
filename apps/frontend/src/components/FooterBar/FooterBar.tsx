import "./FooterBar.scss";
import MatIcon from "../MatIcon/MatIcon.tsx";
import { Button, InputType } from "../Inputs/Inputs.tsx";
import { useNavigate } from "react-router-dom";

export default function FooterBar() {
  const navigate = useNavigate();

  return (
    <footer className="footer" onClick={() => navigate("/")}>
      <MatIcon icon={"build_circle"} color={""} />
      <Button onClick={() => navigate("/")} type={InputType.Blue}>
        Request Service
      </Button>
    </footer>
  );
}
