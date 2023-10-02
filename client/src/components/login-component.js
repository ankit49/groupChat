import React, { useState } from "react";
import { Container, Box, TextField, Button } from "@mui/material";
import { Login } from "@mui/icons-material";
import "./login-component.scss";

const LoginComponent = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    props.handleLogin({ email, password });
  };

  return (
    <Container
      className="flex-center"
      sx={{
        height: "100vh",
        width: "100vw",
      }}
    >
      <Box
        sx={{
          width: (theme) => theme.spacing(50),
          height: (theme) => theme.spacing(40),
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          backgroundColor: "#ededed",
        }}
      >
        <form
          className="flex-center flex-column"
          style={{
            minHeight: "100%",
          }}
          onSubmit={handleLogin}
        >
          <TextField
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
          <Button
            type="submit"
            variant="outlined"
            endIcon={<Login />}
            sx={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
              marginTop: "10px",
              fontSize: "16px",
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};
export default LoginComponent;
