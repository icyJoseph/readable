import * as types from "../constants";

export default function comments(state = [], action) {
  switch (action.type) {
    case types.LOAD_COMMENTS:
      return action.payload;
    default:
      return state;
  }
}
