const CREATE_GROUP = "createGroup";
const GROUP_UPDATE = "groupUpdate";
const GROUP_DELETE = "groupDelete";
const ADD_GROUP_MESSAGE = "addGroupMessage";
const ADD_LIKE = "addLike";
const REMOVE_LIKE = "removeLike";

// eslint-disable-next-line
export default {
  CREATE_GROUP,
  createGroup: (data) => ({ type: CREATE_GROUP, data }),
  GROUP_UPDATE,
  groupUpdate: (data) => ({ type: GROUP_UPDATE, data }),
  GROUP_DELETE,
  groupDelete: (id) => ({ type: GROUP_DELETE, id }),
  ADD_GROUP_MESSAGE,
  addGroupMessage: (messageData) => ({ type: ADD_GROUP_MESSAGE, messageData }),
  ADD_LIKE,
  addLike: (data) => ({ type: ADD_LIKE, data }),
  REMOVE_LIKE,
  removeLike: (data) => ({ type: REMOVE_LIKE, data }),
};
