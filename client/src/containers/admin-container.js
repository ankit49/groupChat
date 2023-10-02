import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Box } from "@mui/material";
import AddUserComponent from "../components/admin-components/add-user-component";
import ListUserComponent from "../components/admin-components/list-user-component";
import authAction from "../actions/auth-action";

class AdminContainer extends React.Component {
  handleAddUser = (userCredentials) => {
    this.props.addUser(userCredentials);
  };

  handleDeleteUser = (email) => {
    this.props.deleteUser(email);
  };

  handleEditUser = (data) => {
    this.props.editUser(data);
  };

  render() {
    return (
      <Box
        className="flex-center flex-column"
        sx={{ width: "100%", marginTop: "20px" }}
      >
        <AddUserComponent handleAddUser={this.handleAddUser} />
        <ListUserComponent
          allUsers={this.props.allUsers}
          handleDeleteUser={this.handleDeleteUser}
          handleEditUser={this.handleEditUser}
        />
      </Box>
    );
  }
}

const structuredSelector = createStructuredSelector({
  allUsers: (state) => state.user.allUsers,
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (userCredentials) => dispatch(authAction.addUser(userCredentials)),
  deleteUser: (email) => dispatch(authAction.deleteUser(email)),
  editUser: (data) => dispatch(authAction.editUser(data)),
});

export default connect(structuredSelector, mapDispatchToProps)(AdminContainer);
