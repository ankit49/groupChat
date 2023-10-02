import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Modal,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import { EditNote } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "#363636",
  color: "#e0e0e0",
  boxShadow:
    "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05), 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
  padding: 4,
};

export default function BasicModal(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.user.name);
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(props.user.isAdmin);

  const handleEditUser = (e) => {
    e.preventDefault();
    props.handleEditUser({ name, email: props.user.email, password, isAdmin });
    setOpen(false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Button sx={{ minWidth: "30px" }} onClick={() => setOpen(true)}>
        <EditNote />
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: "200", marginBottom: "20px" }}
          >
            Update User
          </Typography>
          <form method="post" onSubmit={handleEditUser}>
            <Box>
              <TextField
                variant="standard"
                label="Name..."
                value={name}
                sx={{ width: "100%" }}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Box>
            <Box>
              <TextField
                variant="standard"
                sx={{ width: "100%" }}
                label="Password..."
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            <Box className="flex-center" sx={{ marginTop: "20px" }}>
              <FormControlLabel
                control={
                  <Checkbox
                    className=""
                    checked={isAdmin}
                    onChange={(e) => setIsAdmin(e.target.checked)}
                  />
                }
                label="isAdmin"
              />
              <Button variant="outlined" type="submit">
                Update
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
