import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import history from "./helpers/history";
import MainLayout from "./containers/main-layout";
import LoginContainer from "./containers/login-container";
import AdminContainer from "./containers/admin-container";
import GroupContainer from "./containers/group-container";
import WelcomeComponent from "./components/welcome-component";

import "./App.css";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

class App extends Component {
  checkToken = () =>
    localStorage.getItem("token") ? <MainLayout /> : <Navigate to="/" />;
  checkAdmin = () =>
    this.props.user.isAdmin ? <AdminContainer /> : <Navigate to="/app" />;

  render() {
    return (
      <ThemeProvider theme={darkTheme}>
        <BrowserRouter Navigate={history}>
          <Toaster position="top-right" />
          <Routes>
            <Route exact path="/" element={<LoginContainer />} />
            <Route exact path="/app" element={this.checkToken()}>
              <Route exact path="/app" element={<WelcomeComponent />} />
              <Route exact path="/app/admin" element={this.checkAdmin()} />
              <Route exact path="/app/group/:id" element={<GroupContainer />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}

const structuredSelector = createStructuredSelector({
  user: (state) => state.user,
});

const mapDispatchToProps = () => ({});

export default connect(structuredSelector, mapDispatchToProps)(App);
