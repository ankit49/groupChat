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
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { EditNote } from "@mui/icons-material";
import { Link, Navigate } from "react-router-dom";

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

export default function EditGroupModal(props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(props.name);
  const [users, setUsers] = useState(props.users);

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
    <>
      <Button
        sx={{ minWidth: "30px", color: "white" }}
        onClick={() => setOpen(true)}
      >
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
            Edit Group Name
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
    </>
  );
}
