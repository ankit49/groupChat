import React, { useState } from "react";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Button,
  Grid,
  Typography,
} from "@mui/material";

const AddUserComponent = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleAddUser = (e) => {
    e.preventDefault();
    props.handleAddUser({ name, email, password, isAdmin });
    setName("");
    setEmail("");
    setPassword("");
    setIsAdmin(false);
  };

  return (
    <Box
      sx={{
        width: { xs: "95%", md: "80%" },
        backgroundColor: "#363636",
        color: "#b6b7b9",
        margin: "auto",
        borderRadius: "15px",
        padding: "20px 0",
        boxShadow:
          "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05), 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
      }}
    >
      <Typography variant="h5" align="center" sx={{ marginTop: "10px" }}>
        Add a New User
      </Typography>
      <form method="post" onSubmit={handleAddUser}>
        <Grid
          container
          spacing={2}
          sx={{ margin: "0 10px 0 10px", width: "100%" }}
        >
          <Grid item xs={12} md={4}>
            <TextField
              variant="standard"
              label="Name..."
              sx={{ width: "90%" }}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              variant="standard"
              label="Email..."
              type="email"
              sx={{ width: "90%" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              variant="standard"
              label="Password..."
              type="password"
              sx={{ width: "90%" }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="center">
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{ width: "90%" }}
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                }
                label="isAdmin"
              />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="center" sx={{ marginBottom: "10px" }}>
              <Button variant="outlined" type="submit">
                Add User
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};
export default AddUserComponent;
