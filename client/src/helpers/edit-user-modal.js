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

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "#ededed",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
    <>
      <Button sx={{ minWidth: "30px" }} onClick={() => setOpen(true)}>
        <EditNote />
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
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
    </>
  );
}
