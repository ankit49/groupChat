import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, MenuItemStyles } from "react-pro-sidebar";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CreateGroupModal from "../helpers/modals/create-group-modal";
import bgImage from "../assets/images/bg.jpg";

const SidebarComponent = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(
    window.matchMedia("(max-width: 899px)").matches
  );

  /** @type {MenuItemStyles} */
  const menuItemStyles = {
    root: {
      fontSize: "14px",
      fontWeight: 300,
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? `rgb(8, 36, 64, ${bgImage && !collapsed ? 0.4 : 1})`
          : "transparent",
    }),
    button: {
      "&:hover": {
        backgroundColor: "#005c4b",
        color: "#b6c8d9",
      },
    },
  };

  return (
    <div>
      <Sidebar
        backgroundColor="#363636"
        collapsed={collapsed}
        customBreakPoint="899px"
        onBreakPoint={setBroken}
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        rootStyles={{
          height: "100%",
          color: "#b6b7b9",
          borderRight: broken ? "none" : "1px solid #636D6E",
        }}
      >
        <Box
          sx={{
            height: "40px",
            borderBottom: "1px solid #636D6E",
            padding: "10px 0",
          }}
        >
          <Typography align="center" variant="h4" sx={{ height: "40px" }}>
            Group Chat
          </Typography>
        </Box>
        <Box
          sx={{
            borderBottom: "1px solid #636D6E",
          }}
        >
          <Box
            sx={{
              opacity: collapsed ? 0 : 0.7,
              margin: "30px 0 0 5px",
              fontSize: "12px",
              letterSpacing: "0.5px",
            }}
          >
            Groups
          </Box>
          <Menu menuItemStyles={menuItemStyles}>
            {props.userGroups.map((group) => (
              <MenuItem
                key={group._id}
                onClick={() => setToggled(false)}
                component={<Link to={"/app/group/" + group._id} />}
              >
                {group.name}
              </MenuItem>
            ))}
            <CreateGroupModal
              setToggled={setToggled}
              allUsers={props.allUsers}
              handleCreateGroup={props.handleCreateGroup}
            />
          </Menu>
        </Box>
        <Box
          sx={{
            opacity: collapsed ? 0 : 0.7,
            margin: "30px 0 0 5px",
            fontSize: "12px",
            letterSpacing: "0.5px",
          }}
        >
          Settings
        </Box>
        <Menu menuItemStyles={menuItemStyles}>
          {props.isAdmin && (
            <MenuItem
              onClick={() => setToggled(false)}
              component={<Link to="/app/admin" />}
            >
              Add / Modify Users
            </MenuItem>
          )}
          <MenuItem className="button" onClick={() => props.handleLogout()}>
            Logout
          </MenuItem>
          <MenuItem onClick={() => setCollapsed(!collapsed)}>Collapse</MenuItem>
        </Menu>
      </Sidebar>
      {broken && (
        <Button
          sx={{
            height: "30px",
            width: "100%",
            borderRadius: "0px",
            backgroundColor: "#363636",
            color: "#005c4b",
            letterSpacing: "0.5em",
          }}
          onClick={() => setToggled(!toggled)}
        >
          Show Groups
        </Button>
      )}
    </div>
  );
};
export default SidebarComponent;
