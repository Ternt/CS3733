import "./LoginPage.scss";
import Card from "../../components/Card/Card.tsx";
import { useState } from "react";
import { LoginCredentials } from "../../common/LoginCredentials.ts";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, TextField } from "@mui/material";

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
    if (credential.username === "admin" && credential.password === "admin") {
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
    <Box className={"login-page"}>
      <Card>
        <h1>Login</h1>
        {/*
        <SmallTextInput
          onChange={(e: string) => handleUsernameInput(e)}
          type={InputType.Gold}
          placeholder={"username"}
          label={"Username:"}
        />
        */}
        <FormControl fullWidth>
          <TextField
            id="input-with-sx"
            label="Username"
            variant="standard"
            onChange={(e) => handleUsernameInput(e.target.value)}
          />
          {/*
            <SmallTextInput
              onChange={(e: string) => handlePasswordInput(e)}
              type={InputType.Gold}
              placeholder={"password"}
              label={"Password:"}
            />
            */}
          <TextField
            id="password-input"
            label="Password"
            variant="standard"
            onChange={(e) => handlePasswordInput(e.target.value)}
          />
          <Button
            color="secondary"
            variant="contained"
            type="submit"
            onClick={() => handleSubmit()}
            style={{ marginTop: "40px" }}
          >
            Login
          </Button>
          <p className={"error-message"}>{error}</p>
          <Button href="/" color={"primary"} variant="contained" fullWidth>
            Return to Map
          </Button>
        </FormControl>
      </Card>
    </Box>
  );
}
