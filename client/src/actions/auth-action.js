const LOGIN = "login";
const LOGIN_SUCCESS = "loginSuccess";
const LOGOUT = "logout";
const ADD_USER = "addUser";
const EDIT_USER = "editUser";
const DELETE_USER = "deleteUser";
const GET_CURRENT_USER = "getCurrentUser";
const LIST_ALL_USERS = "listAllUsers";
const LIST_ALL_USER_SUCCESS = "listAllUsersSuccess";

// eslint-disable-next-line
export default {
  LOGIN_SUCCESS,
  loginSuccess: (data) => ({ type: LOGIN_SUCCESS, data }),
  LOGIN,
  login: (userCredentials) => ({ type: LOGIN, userCredentials }),
  LOGOUT,
  logout: () => ({ type: LOGOUT }),
  ADD_USER,
  addUser: (userCredentials) => ({ type: ADD_USER, userCredentials }),
  EDIT_USER,
  editUser: (data) => ({ type: EDIT_USER, data }),
  DELETE_USER,
  deleteUser: (email) => ({ type: DELETE_USER, email }),
  GET_CURRENT_USER,
  getCurrentUser: () => ({ type: GET_CURRENT_USER }),
  LIST_ALL_USERS,
  listAllUsers: () => ({ type: LIST_ALL_USERS }),
  LIST_ALL_USER_SUCCESS,
  listAllUsersSuccess: (data) => ({ type: LIST_ALL_USER_SUCCESS, data }),
};
