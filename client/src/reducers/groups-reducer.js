import groupAction from "../actions/group-action";

const initialState = [];

export const groupsReducer = (state = initialState, action) => {
  switch (action.type) {
    case groupAction.SAVE_GROUPS_DATA:
      return [...state, ...action.data];
    default:
      return state;
  }
};
