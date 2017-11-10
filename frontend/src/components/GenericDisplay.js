import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import {
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText
} from "reactstrap";
import { UP_VOTE, DOWN_VOTE } from "../constants";
import { capitalizer } from "../utils/helpers";

class GenericDisplay extends Component {
  // TODO: Use timeStamp
  displayOP(id, title, body, author, category, voteScore, commentCount) {
    return (
      <ListGroupItem>
        <ListGroupItemHeading>
          <NavLink to={`/${category}/${id}`}>{title}</NavLink>{" "}
        </ListGroupItemHeading>
        <ListGroupItemText>{body}</ListGroupItemText>
        <ListGroupItemText>by: {author}</ListGroupItemText>
        <ListGroupItemText>
          <span>Category: {capitalizer(category)}</span> {" "}
          <span>Comments: {commentCount}</span> {" "}
          <span>
            Votes:{" "}
            {voteScore > 0
              ? `${voteScore} ${UP_VOTE}`
              : voteScore === 0 ? "" : `${voteScore} ${DOWN_VOTE}`}
          </span>
        </ListGroupItemText>
      </ListGroupItem>
    );
  }

  // TODO: Use timeStamp
  displayComment(author, body, voteScore) {
    return (
      <ListGroupItem>
        <ListGroupItemText>{author} says:</ListGroupItemText>
        <ListGroupItemText>{body}</ListGroupItemText>
        <ListGroupItemText>
          <span>
            Votes:{" "}
            {voteScore > 0
              ? `${voteScore} ${UP_VOTE}`
              : voteScore === 0 ? "" : `${voteScore} ${DOWN_VOTE}`}
          </span>
        </ListGroupItemText>
      </ListGroupItem>
    );
  }

  render() {
    const {
      post: { id, title, body, author, category, voteScore, commentCount }
    } = this.props;
    const postIsAComment = this.props.post.parentId;
    if (postIsAComment) {
      return this.displayComment(author, body, voteScore);
    } else {
      return this.displayOP(
        id,
        title,
        body,
        author,
        category,
        voteScore,
        commentCount
      );
    }
  }
}

export default GenericDisplay;
