import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Modal,
  Typography,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  Chip,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { MenuItem } from "react-pro-sidebar";

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
  width: { xs: 300, md: 400 },
  bgcolor: "#363636",
  color: "#e0e0e0",
  boxShadow:
    "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05), 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
  padding: 4,
};

export default function CreateGroupModal(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  const handleCreateGroup = (e) => {
    e.preventDefault();
    props.handleCreateGroup({
      name,
      users: users.map((user) => ({
        name: user.split("/")[0],
        email: user.split("/")[1],
      })),
    });
    setOpen(false);
    setName("");
    setUsers([]);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setUsers(value);
  };
  return (
    <ThemeProvider theme={darkTheme}>
      <MenuItem
        onClick={() => {
          setOpen(true);
          props.setToggled(false);
        }}
      >
        Create a new Group
      </MenuItem>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: "200", marginBottom: "20px" }}
          >
            Create a New Group
          </Typography>
          <form method="post" onSubmit={handleCreateGroup}>
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
            <FormControl sx={{ width: "100%", marginTop: "20px" }}>
              <InputLabel>Users</InputLabel>
              <Select
                multiple
                value={users}
                onChange={handleChange}
                input={<OutlinedInput label="Users" />}
                renderValue={(selected) => {
                  return (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value?.split("/")[0]} />
                      ))}
                    </Box>
                  );
                }}
              >
                {props.allUsers.map((user) => (
                  <MenuItem
                    key={user.email}
                    value={user.name + "/" + user.email}
                  >
                    {user.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box textAlign="center" sx={{ marginTop: "20px" }}>
              <Button variant="outlined" type="submit">
                Create
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
