import * as types from "../constants";

export default function categories(state = [], action) {
  switch (action.type) {
    case types.LOAD_CATEGORIES:
      return action.payload;
    default:
      return state;
  }
}
