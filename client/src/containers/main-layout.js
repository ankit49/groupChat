import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Box } from "@mui/material";
import authAction from "../actions/auth-action";
import SidebarComponent from "../components/sidebar-component";
import { Outlet } from "react-router-dom";
import groupAction from "../actions/group-action";

class MainLayout extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
    this.props.listAllUsers();
  }

  handleLogout = () => {
    this.props.handleLogoutAction();
  };

  handleCreateGroup = (data) => {
    this.props.handleCreateGroup(data);
  };

  render() {
    return (
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          height: "100vh",
        }}
      >
        <SidebarComponent
          userGroups={this.props.user.groups}
          isAdmin={this.props.user.isAdmin}
          allUsers={this.props.allUsers}
          handleLogout={this.handleLogout}
          handleCreateGroup={this.handleCreateGroup}
        />
        <Box
          sx={{
            width: "100%",
            overflowY: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    );
  }
}

const structuredSelector = createStructuredSelector({
  user: (state) => state.user,
  allUsers: (state) => state.user.allUsers,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrentUser: () => dispatch(authAction.getCurrentUser()),
  listAllUsers: () => dispatch(authAction.listAllUsers()),
  handleLogoutAction: () => dispatch(authAction.logout()),
  handleCreateGroup: (data) => dispatch(groupAction.createGroup(data)),
});

export default connect(structuredSelector, mapDispatchToProps)(MainLayout);
