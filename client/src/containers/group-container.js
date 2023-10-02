import React, { Component } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import groupAction from "../actions/group-action";
import GroupComponent from "../components/group-components/body-component";

class GroupContainer extends Component {
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
      <GroupComponent
        groups={this.props.groups}
        allUsers={this.props.user.allUsers}
        user={this.props.user}
        handleGroupUpdate={this.props.handleGroupUpdate}
        handleGroupDelete={this.props.handleGroupDelete}
        handleUpdateGroupMessage={this.handleUpdateGroupMessage}
        handleAddLike={this.handleAddLike}
        handleRemoveLike={this.handleRemoveLike}
      />
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

export default connect(structuredSelector, mapDispatchToProps)(GroupContainer);
