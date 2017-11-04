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
export const getAllCategories = (dispatch) => {
  dispatch({ type: types.GET_CATEGORIES });
  const query = `${apiEndPoint}/categories`;
  axios.get(query, config).then(res => {
    dispatch({
      type: types.LOAD_CATEGORIES,
      payload: res.data.categories
    });
  });
};
