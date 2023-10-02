import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import history from "./helpers/history";
import MainLayout from "./containers/main-layout";
import LoginContainer from "./containers/login-container";
import groupAction from "./actions/group-action";
import "./App.scss";
import AdminContainer from "./containers/admin-container";
import GroupContainer from "./containers/group-container";

class App extends Component {
  checkToken = () =>
    localStorage.getItem("token") ? <MainLayout /> : <Navigate to="/" />;
  checkAdmin = () =>
    this.props.user.isAdmin ? <AdminContainer /> : <Navigate to="/app" />;

  handleUpdateGroupMessage = (content, id) => {
    let messageData = {
      id: id,
      message: {
        sender: {
          name: this.props.user.name,
          email: this.props.user.email,
        },
        content: content,
      },
    };
    this.props.handleUpdateGroupMessage(messageData);
  };

  handleAddLike = (id) => {
    let data = {
      id: id,
      like: {
        name: this.props.user.name,
        email: this.props.user.email,
      },
    };
    this.props.handleAddLike(data);
  };

  handleRemoveLike = (id) => {
    let data = {
      id: id,
      like: {
        name: this.props.user.name,
        email: this.props.user.email,
      },
    };
    this.props.handleRemoveLike(data);
  };

  render() {
    return (
      <BrowserRouter Navigate={history}>
        <Toaster position="top-right" />
        <Routes>
          <Route exact path="/" element={<LoginContainer />} />
          <Route exact path="/app" element={this.checkToken()}>
            <Route exact path="/app/admin" element={this.checkAdmin()} />
            <Route
              exact
              path="/app/group/:id"
              element={
                <GroupContainer
                  groups={this.props.groups}
                  allUsers={this.props.user.allUsers}
                  user={this.props.user}
                  handleGroupUpdate={this.props.handleGroupUpdate}
                  handleGroupDelete={this.props.handleGroupDelete}
                  handleUpdateGroupMessage={this.handleUpdateGroupMessage}
                  handleAddLike={this.handleAddLike}
                  handleRemoveLike={this.handleRemoveLike}
                />
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }
}

const structuredSelector = createStructuredSelector({
  user: (state) => state.user,
  groups: (state) => state.user.groups,
});

const mapDispatchToProps = (dispatch) => ({
  handleGroupUpdate: (data) => dispatch(groupAction.groupUpdate(data)),
  handleGroupDelete: (id) => dispatch(groupAction.groupDelete(id)),
  handleUpdateGroupMessage: (messageData) =>
    dispatch(groupAction.addGroupMessage(messageData)),
  handleAddLike: (data) => dispatch(groupAction.addLike(data)),
  handleRemoveLike: (data) => dispatch(groupAction.removeLike(data)),
});

export default connect(structuredSelector, mapDispatchToProps)(App);
