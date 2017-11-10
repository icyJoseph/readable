import * as types from "../constants";

export default function posts(state = [], action) {
  switch (action.type) {
    case types.LOAD_POSTS:
      return action.payload;
    case types.LOAD_POST_BY_ID:
      return Object.assign([], [action.payload], state);
    default:
      return state;
  }
}
