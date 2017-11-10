import axios from "axios";
import * as types from "../constants";

const apiEndPoint = "http://localhost:3001";
const config = {
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Authorization: "react-redux"
  }
};

// Action creator to fetch "all categories" from the server
export const getAllCategories = dispatch => {
  dispatch({ type: types.GET_CATEGORIES });
  const query = `${apiEndPoint}/categories`;
  axios.get(query, config).then(res => {
    dispatch({
      type: types.LOAD_CATEGORIES,
      payload: res.data.categories
    });
  });
};

// Action creator to fetch posts for a given category
export const getPosts = cat => {
  return function(dispatch) {
    dispatch({ type: types.GET_POSTS });
    const query = cat === "" ? "posts" : `${cat}/posts`;
    axios.get(`${apiEndPoint}/${query}`, config).then(res => {
      dispatch({
        type: types.LOAD_POSTS,
        payload: res.data
      });
    });
  };
};

//Action creator to get data from a single post by its id
export const getPostByID = id => {
  return function(dispatch) {
    dispatch({ type: types.GET_POST_BY_ID });
    const query = `posts/${id}`;
    axios.get(`${apiEndPoint}/${query}`, config).then(res => {
      dispatch({
        type: types.LOAD_POST_BY_ID,
        payload: res.data
      });
    });
  };
};

// Action creator to fetch the comments that have as parent Post:id
export const getComments = id => {
  return function(dispatch) {
    dispatch({ type: types.GET_COMMENTS });
    const query = `posts/${id}/comments`;
    axios.get(`${apiEndPoint}/${query}`, config).then(res => {
      dispatch({
        type: types.LOAD_COMMENTS,
        payload: res.data
      });
    });
  };
};
