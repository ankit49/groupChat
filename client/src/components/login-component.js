import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { Login } from "@mui/icons-material";
import bgImage from "../assets/images/bg.jpg";

const LoginComponent = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    props.handleLogin({ email, password });
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: 300, md: 400 },
          height: "250px",
          bgcolor: "#363636",
          color: "#e0e0e0",
          boxShadow:
            "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05), 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
          padding: 4,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: "200", marginBottom: "20px" }}
        >
          Login Here
        </Typography>
        <form method="post" onSubmit={handleLogin}>
          <Box>
            <TextField
              id="email"
              label="Email"
              value={email}
              sx={{ width: "100%" }}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
          </Box>
          <Box>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              sx={{ width: "100%", marginTop: "15px" }}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </Box>
          <Box textAlign="center" sx={{ marginTop: "20px" }}>
            <Button type="submit" variant="outlined" endIcon={<Login />}>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
export default LoginComponent;
