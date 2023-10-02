import React from "react";
import {
  FormControlLabel,
  Checkbox,
  TextField,
  Box,
  Button,
  Grid,
  Typography,
  AvatarGroup,
  Avatar,
} from "@mui/material";
import EditGroupModal from "../../helpers/modals/edit-group-modal";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split("")[0]}`,
  };
}

const HeaderComponent = (props) => {
  return (
    <Box
      sx={{
        height: "60px",
        backgroundColor: "#363636",
        color: "#b6b7b9",
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        borderBottom: "1px solid #636D6E",
      }}
    >
      <Box
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          width: { xs: "60%" },
          display: "flex",
        }}
      >
        <Avatar
          sx={{
            marginTop: "10px",
            height: "35px",
            width: "35px",
            bgcolor: "orangered",
          }}
        >
          {props.groupData.name.split("")[0].toUpperCase()}
        </Avatar>
        <Typography
          variant="h5"
          noWrap
          sx={{
            fontWeight: 300,
            padding: "10px",
          }}
        >
          {props.groupData.name}
        </Typography>
      </Box>
      <Box sx={{ display: "flex" }}>
        <AvatarGroup
          max={4}
          sx={{
            paddingTop: "10px",
            "& .MuiAvatar-root": { height: "30px", width: "30px" },
          }}
        >
          {props.groupData.users.map((user) => (
            <Avatar key={user.email} {...stringAvatar(user.name)} />
          ))}
        </AvatarGroup>
        <EditGroupModal
          handleGroupUpdate={props.handleGroupUpdate}
          id={props.groupData._id}
          name={props.groupData.name}
          users={props.groupData.users.map(
            (user) => user.name + "/" + user.email
          )}
          allUsers={props.allUsers}
          handleGroupDelete={props.handleGroupDelete}
        />
      </Box>
    </Box>
  );
};
export default HeaderComponent;
