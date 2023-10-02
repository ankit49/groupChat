import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  MenuItem,
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
  width: { xs: 300, md: 400 },
  bgcolor: "#363636",
  color: "#e0e0e0",
  boxShadow:
    "inset 0 0 0.5px 1px hsla(0, 0%, 100%, 0.075), 0 0 0 1px hsla(0, 0%, 0%, 0.05), 0 0.3px 0.4px hsla(0, 0%, 0%, 0.02), 0 0.9px 1.5px hsla(0, 0%, 0%, 0.045), 0 3.5px 6px hsla(0, 0%, 0%, 0.09)",
  padding: 4,
};

export default function EditGroupModal(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.name);
  const [users, setUsers] = useState(props.users);

  useEffect(() => {
    setName(props.name);
    setUsers(props.users);
  }, [props]);

  const navigate = useNavigate();

  const handleGroupUpdate = (e) => {
    e.preventDefault();
    props.handleGroupUpdate({
      name,
      users: users.map((user) => ({
        name: user.split("/")[0],
        email: user.split("/")[1],
      })),
      id: props.id,
    });
    setOpen(false);
  };

  const handleGroupDelete = () => {
    navigate("/app");
    props.handleGroupDelete(props.id);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setUsers(value);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Button
        sx={{ minWidth: "30px", color: "#e0e0e0" }}
        onClick={() => setOpen(true)}
      >
        <EditNote />
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <Typography
            variant="h6"
            align="center"
            sx={{ fontWeight: "200", marginBottom: "20px" }}
          >
            Edit Group
          </Typography>
          <form method="post" onSubmit={handleGroupUpdate}>
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
                        <Chip key={value} label={value.split("/")[0]} />
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
            <Box
              sx={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Button
                variant="outlined"
                onClick={() => handleGroupDelete()}
                color="error"
              >
                Delete Group
              </Button>
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
