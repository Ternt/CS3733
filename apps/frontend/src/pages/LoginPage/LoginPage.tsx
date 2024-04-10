import { useEffect, useState } from "react";
import { LoginCredentials } from "../../common/LoginCredentials.ts";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import background from "./login-page-background.png";

export default function LoginPage() {
  useEffect(() => {
    document.title = "B+W Login";
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
    <>
      <img
        src={background}
        alt={"login-background"}
        style={{
          width: "100vw",
          height: "50vh",
          objectFit: "cover",
        }}
      />
      <Box>
        <Card
          sx={{
            width: "20vw",
            position: "absolute",
            left: "50%",
            top: "60%",
            transform: "translate(-50%,-50%)",
            boxShadow: 5,
            px: 5,
            pt: 5,
            pb: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Typography variant={"h5"}>Login</Typography>
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
            <Typography
              variant={"subtitle2"}
              sx={{ color: "red", textAlign: "center" }}
            >
              {error}
            </Typography>
          </FormControl>
        </Card>
      </Box>
    </>
  );
}
