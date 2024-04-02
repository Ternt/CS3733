import "./LoginPage.scss";
import {
  Button,
  InputType,
  SmallTextInput,
} from "../../components/Inputs/Inputs.tsx";
import Card from "../../components/Card/Card.tsx";
import { useState } from "react";
import { LoginCredentials } from "../../common/LoginCredentials.ts";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [credential, setCredential] = useState<LoginCredentials>({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  function handleUsernameInput(e: string) {
    setCredential({ ...credential, username: e });
  }

  function handlePasswordInput(e: string) {
    setCredential({ ...credential, password: e });
  }

  function handleSubmit() {
    if (credential.username === "admin" && credential.password === "123") {
      navigate("/");
    } else {
      setError("Incorrect Username or Password"); // TODO make this response come from an API call
      handleUsernameInput("");
      handlePasswordInput("");
      setTimeout(() => {
        //TODO use useEffect to make this a non overlapping action
        setError("");
      }, 5000);
    }
  }

  return (
    <div className={"login-page"}>
      <p>admin 123</p>
      <Card>
        <h2>Login</h2>
        <SmallTextInput
          onChange={(e: string) => handleUsernameInput(e)}
          type={InputType.Gold}
          placeholder={"username"}
          label={"Username:"}
        />
        <SmallTextInput
          onChange={(e: string) => handlePasswordInput(e)}
          type={InputType.Gold}
          placeholder={"password"}
          label={"Password:"}
        />
        <Button type={InputType.Gold} onClick={() => handleSubmit()}>
          Login
        </Button>
        <p className={"error-message"}>{error}</p>
        <Link to={"/"}> &lt; Back to Map</Link>
      </Card>
    </div>
  );
}
