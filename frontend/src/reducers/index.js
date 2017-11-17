import { combineReducers } from "redux";
import categories from "./categories";
import comments from "./comments";
import posts from "./posts";
import sort from "./sort";

export default combineReducers({
  categories,
  comments,
  posts,
  sort
});
