import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import history from "../helpers/history";
import LoginComponent from "../components/login-component";
import authAction from "../actions/auth-action";

// import "./auth-container.scss";

class LoginContainer extends React.Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      history.push("/app");
    }
  }

  handleLogin = (userCredentials) => {
    this.props.sendLoginRequest(userCredentials);
  };

  render() {
    return (
      <div className="login-container">
        <LoginComponent handleLogin={this.handleLogin} />
      </div>
    );
  }
}

const structuredSelector = createStructuredSelector({});

const mapDispatchToProps = (dispatch) => ({
  sendLoginRequest: (userCredentials) =>
    dispatch(authAction.login(userCredentials)),
});

export default connect(structuredSelector, mapDispatchToProps)(LoginContainer);
