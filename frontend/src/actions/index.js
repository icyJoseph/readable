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
    const query =
      cat === "" ? `${apiEndPoint}/posts` : `${apiEndPoint}/${cat}/posts`;
    axios.get(query, config).then(res => {
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
    const query = `${apiEndPoint}/posts/${id}`;
    axios.get(query, config).then(res => {
      dispatch({
        type: types.LOAD_POST_BY_ID,
        payload: res.data
      });
    });
  };
};

//Action creator to get data from a single comment by its id
export const getCommentByID = id => {
  return function(dispatch) {
    dispatch({ type: types.GET_COMMENT_BY_ID });
    const query = `${apiEndPoint}/comment/${id}`;
    axios.get(query, config).then(res => {
      dispatch({
        type: types.LOAD_COMMENT_BY_ID,
        payload: res.data
      });
    });
  };
};

// Action creator to fetch the comments that have as parent Post:id
export const getComments = id => {
  return function(dispatch) {
    dispatch({ type: types.GET_COMMENTS });
    const query = `${apiEndPoint}/posts/${id}/comments`;
    axios.get(query, config).then(res => {
      dispatch({
        type: types.LOAD_COMMENTS,
        payload: res.data
      });
    });
  };
};

// Action creator to upVote or downVote an original post or a comment
export const vote = (id, option, type) => {
  const data = { option: option };
  switch (type) {
    case types.POST:
      return function(dispatch) {
        dispatch({ type: types.VOTE_POST });
        const query = `${apiEndPoint}/posts/${id}`;
        axios.post(query, data, config).then(res => {
          dispatch({
            type: types.LOAD_POST_BY_ID,
            payload: res.data
          });
        });
      };
    case types.COMMENT:
      return function(dispatch) {
        dispatch({ type: types.VOTE_COMMENT });
        const query = `${apiEndPoint}/comments/${id}`;
        axios.post(query, data, config).then(res => {
          dispatch({
            type: types.LOAD_COMMENT_BY_ID,
            payload: res.data
          });
        });
      };
    default:
      return null;
  }
};

//Action creator to create  post in the server
export const createPost = post => {
  return function(dispatch) {
    dispatch({ type: types.CREATE_POST });
    if (post.parentId) {
      const query = `${apiEndPoint}/comments`;
      axios.post(query, post, config).then(res => {
        dispatch({
          type: types.LOAD_COMMENT_BY_ID,
          payload: res.data
        });
      });
    } else {
      const query = `${apiEndPoint}/posts`;
      axios.post(query, post, config).then(res => {
        dispatch({
          type: types.LOAD_POST_BY_ID,
          payload: res.data
        });
      });
    }
  };
};

//Action to change the sorting mechanism
export const changeSort = mechanism => {
  return {
    type: mechanism
  };
};
