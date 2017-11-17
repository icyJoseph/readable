import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";

import Vote from "./Vote";

import { UP_VOTE, DOWN_VOTE, POST, COMMENT } from "../constants";
import { capitalizer } from "../utils/helpers";

class GenericDisplay extends Component {
  // TODO: Use timeStamp
  displayOP({
    id,
    timestamp,
    title,
    body,
    author,
    category,
    voteScore,
    commentCount
  }) {
    const date = new Date(timestamp);
    const formatedDate = date.format("dd.mm.yyyy");
    console.log(formatedDate);
    return (
      <ListGroupItem style={margins}>
        <ListGroupItemHeading>
          <NavLink to={`/${category}/${id}`}>{title}</NavLink>{" "}
        </ListGroupItemHeading>
        <ListGroupItemText>{body}</ListGroupItemText>
        <ListGroupItemText>by: {author}</ListGroupItemText>
        <ListGroupItemText>Category: {capitalizer(category)}</ListGroupItemText>
        <ListGroupItemText>Comments: {commentCount}</ListGroupItemText>
        <ListGroupItemText>
          Votes:{" "}
          {voteScore > 0 ? (
            <span style={upVote}>
              {voteScore} {UP_VOTE}
            </span>
          ) : voteScore === 0 ? (
            "0"
          ) : (
            <span style={downVote}>
              {voteScore} {DOWN_VOTE}
            </span>
          )}
        </ListGroupItemText>
        <ListGroupItemText>
          <NavLink to={`/editpost/${id}`} style={tooling}>
            Edit
          </NavLink>
          <span style={tooling}>Delete</span>
        </ListGroupItemText>
        <Vote id={id} type={POST} />
      </ListGroupItem>
    );
  }

  // TODO: Use timeStamp
  displayComment({ id, author, body, voteScore }) {
    return (
      <ListGroupItem style={margins}>
        <ListGroupItemText>{author} says:</ListGroupItemText>
        <ListGroupItemText>{body}</ListGroupItemText>
        <ListGroupItemText>
          Votes:{" "}
          {voteScore > 0 ? (
            <span style={upVote}>
              {voteScore} {UP_VOTE}
            </span>
          ) : voteScore === 0 ? (
            "0"
          ) : (
            <span style={downVote}>
              {voteScore} {DOWN_VOTE}
            </span>
          )}
        </ListGroupItemText>
        <ListGroupItemText>
          <NavLink to={`/editcomment/${id}`} style={tooling}>
            Edit
          </NavLink>
          <span style={tooling}>Delete</span>
        </ListGroupItemText>
        <Vote id={id} type={COMMENT} />
      </ListGroupItem>
    );
  }

  render() {
    const { post } = this.props;
    const postIsAComment = this.props.post.parentId;
    if (postIsAComment) {
      return this.displayComment(post);
    } else {
      return this.displayOP(post);
    }
  }
}

const upVote = {
  color: "green"
};

const downVote = {
  color: "red"
};

const margins = {
  marginBottom: "7px",
  marginTop: "7px"
};

const tooling = {
  cursor: "pointer",
  fontSize: "9pt",
  margin: "10px",
  textDecoration: "underline"
};

export default GenericDisplay;
