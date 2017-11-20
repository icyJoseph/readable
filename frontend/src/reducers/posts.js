import * as types from "../constants";

export default function posts(state = [], action) {
  switch (action.type) {
    case types.LOAD_POSTS:
      return action.payload.filter(post => !post.deleted);
    case types.LOAD_POST_BY_ID:
      //filter state to remove the post in case it already exists
      const filteredState = state.filter(post => post.id !== action.payload.id);
      // Return an array which adds the post to the filtered state
      return action.payload.deleted
        ? filteredState
        : filteredState.concat(action.payload);
    case types.NO_POST:
      return state.concat(action.payload);
    default:
      return state;
  }
}
