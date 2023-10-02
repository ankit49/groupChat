import authAction from "../actions/auth-action";

const initialState = {
  name: "",
  email: "",
  isAdmin: false,
  allUsers: [],
  groups: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case authAction.LOGIN_SUCCESS:
      return {
        ...state,
        name: action.data.name,
        email: action.data.email,
        isAdmin: action.data.isAdmin,
        groups: action.data.groups,
      };
    case authAction.LIST_ALL_USER_SUCCESS:
      return { ...state, allUsers: action.data };
    default:
      return state;
  }
};
