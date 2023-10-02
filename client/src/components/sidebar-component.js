import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, MenuItemStyles } from "react-pro-sidebar";
import { Box, Button } from "@mui/material";
import bgImage from "../assets/images/bg.jpg";
import { Link } from "react-router-dom";
import CreateGroupModal from "../helpers/create-group-modal";

const SidebarComponent = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [broken, setBroken] = useState(
    window.matchMedia("(max-width: 899px)").matches
  );

  /** @type {MenuItemStyles} */
  const menuItemStyles = {
    root: {
      fontSize: "13px",
      fontWeight: 400,
    },
    icon: {
      color: "#59d0ff",
    },
    SubMenuExpandIcon: {
      color: "#b6b7b9",
    },
    subMenuContent: ({ level }) => ({
      backgroundColor:
        level === 0
          ? `rgb(8, 36, 64, ${bgImage && !collapsed ? 0.4 : 1})`
          : "transparent",
    }),
    button: {
      "&:hover": {
        backgroundColor: `rgb(0, 69, 139, ${bgImage ? 0.8 : 1})`,
        color: "#b6c8d9",
      },
    },
    label: ({ open }) => ({
      fontWeight: open ? 600 : undefined,
    }),
  };

  return (
    <div>
      <Sidebar
        // image={bgImage ? bgImage : false}
        backgroundColor="#202c33"
        collapsed={collapsed}
        customBreakPoint="899px"
        onBreakPoint={setBroken}
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        rootStyles={{
          height: "100%",
          color: "#8ba1b7",
          borderRight: broken ? "none" : "1px solid #636D6E",
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
            background:
              "linear-gradient(90deg, hsla(210, 72%, 14%, 1) 0%, hsla(209, 45%, 26%, 1) 53%, hsla(210, 45%, 43%, 1) 100%)",
            color: "#e0e0e0",
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
