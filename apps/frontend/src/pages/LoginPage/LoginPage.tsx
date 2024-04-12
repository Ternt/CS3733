import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, TextField } from "@mui/material";
import background from "./login-page-background.png";
import Card from "@mui/material/Card";

type LoginCredentials = {
  username:string;
  password:string;
};

export default function LoginPage() {
  useEffect(() => {
    document.title = "B&W Login";
  });
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
      navigate("/admin");
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
    <>
      <Box
        component="img"
        src={background}
        sx={{
          objectFit: "cover",
          overflow: "hidden",
          height: "72.2vh",
        }}
      ></Box>

      <Box
        className={"login-page"}
        sx={{
          height: 0,
        }}
      >
        <Card>
          <h1>Login</h1>
          <FormControl fullWidth>
            <TextField
              id="input-with-sx"
              label="Username"
              variant="standard"
              onChange={(e) => handleUsernameInput(e.target.value)}
            />
            <TextField
              id="password-input"
              label="Password"
              variant="standard"
              type={"password"}
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
          </FormControl>
        </Card>
      </Box>
    </>
  );
}
