import * as types from "../constants";

export default function comments(state = [], action) {
  switch (action.type) {
    case types.LOAD_COMMENTS:
      return action.payload;
    case types.LOAD_COMMENT_BY_ID:
      //filter state to remove the comment in case it already exists
      const filteredState = state.filter(
        comment => comment.id !== action.payload.id
      );
      // Return an array which adds the comment to the filtered state
      return filteredState.concat(action.payload);
    default:
      return state;
  }
}
