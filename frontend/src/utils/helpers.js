import uuid from "uuid/v1";
import * as types from "../constants";

// Changes first letter of a word from lower case to upper case. Returns a new word.
export const capitalizer = word => {
  return word.charAt(0).toUpperCase() + word.slice(1);
};

// Sorts an array according to a given rule
export const sortArr = (arr, rule) => {
  let property = "voteScore";
  switch (rule) {
    case types.MOST_POPULAR:
      property = "voteScore";
      return arr.slice().sort((a, b) => b[property] - a[property]);
    case types.MOST_HATED:
      property = "voteScore";
      return arr.slice().sort((a, b) => a[property] - b[property]);
    case types.RECENT:
      property = "timestamp";
      return arr.slice().sort((a, b) => b[property] - a[property]);
    case types.OLDEST:
      property = "timestamp";
      return arr.slice().sort((a, b) => a[property] - b[property]);
    default:
      return arr.slice().sort((a, b) => b[property] - a[property]);
  }
};

export const generateMeta = () => {
  return {
    id: uuid(),
    timestamp: Date.now()
  };
};
