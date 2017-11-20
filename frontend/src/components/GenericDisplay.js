import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";
import moment from "moment";
import Vote from "./Vote";

import { deletePost, getPostByID } from "../actions";

import { UP_VOTE, DOWN_VOTE, POST, COMMENT } from "../constants";
import { capitalizer } from "../utils/helpers";

class GenericDisplay extends Component {
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
    const formatedDate = moment(date).format("LLLL");
    return (
      <ListGroupItem style={margins}>
        <ListGroupItemHeading>
          <NavLink to={`/${category}/${id}`}>{title}</NavLink>{" "}
        </ListGroupItemHeading>
        <ListGroupItemText style={{ fontSize: "10pt" }}>
          {formatedDate}
        </ListGroupItemText>
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
          <NavLink
            to={`/${category}`}
            style={tooling}
            onClick={() => this.props.deletePost(id, POST)}
          >
            Delete
          </NavLink>
        </ListGroupItemText>
        <Vote id={id} type={POST} />
      </ListGroupItem>
    );
  }

  displayComment({ id, timestamp, author, body, voteScore, parentId }) {
    const date = new Date(timestamp);
    const formatedDate = moment(date).format("LLLL");
    return (
      <ListGroupItem style={margins}>
        <ListGroupItemText>{author} says:</ListGroupItemText>
        <ListGroupItemText>{body}</ListGroupItemText>
        <ListGroupItemText style={{ fontSize: "10pt" }}>
          {formatedDate}
        </ListGroupItemText>
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
          <span
            style={tooling}
            onClick={() => {
              this.props.getPostByID(parentId);
              this.props.deletePost(id, COMMENT);
            }}
          >
            Delete
          </span>
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

function mapDispatchToProps(dispatch) {
  return {
    getPostByID: parentId => dispatch(getPostByID(parentId)),
    deletePost: (id, type) => dispatch(deletePost(id, type))
  };
}

export default connect(undefined, mapDispatchToProps)(GenericDisplay);
