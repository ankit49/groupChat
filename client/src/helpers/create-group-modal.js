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
import { MenuItem } from "react-pro-sidebar";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: 300, md: 400 },
  bgcolor: "#ededed",
  boxShadow:
    "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
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
    <>
      <MenuItem
        onClick={() => {
          setOpen(true);
          props.setToggled(false);
        }}
      >
        Create a new Group
      </MenuItem>
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
    </>
  );
}
