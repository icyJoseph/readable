import * as types from "../constants";

export default function sort(state = types.MOST_POPULAR, action) {
  switch (action.type) {
    case types.MOST_POPULAR:
      return types.MOST_POPULAR;
    case types.MOST_HATED:
      return types.MOST_HATED;
    case types.RECENT:
      return types.RECENT;
    case types.OLDEST:
      return types.OLDEST;
    default:
      return state;
  }
}
