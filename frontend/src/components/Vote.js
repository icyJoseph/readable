import React from "react";
import { connect } from "react-redux";

import { vote } from "../actions";

import { Container, Button } from "reactstrap";
import {
  UP_VOTE,
  DOWN_VOTE,
  OPTION_UPVOTE,
  OPTION_DOWNVOTE
} from "../constants";

const Vote = ({ id, vote, type }) => {
  return (
    <Container>
      <Button
        onClick={() => vote(id, OPTION_UPVOTE, type)}
        style={style}
        color="success"
      >
        {UP_VOTE}
      </Button>
      <Button
        onClick={() => vote(id, OPTION_DOWNVOTE, type)}
        style={style}
        color="danger"
      >
        {DOWN_VOTE}
      </Button>
    </Container>
  );
};

const style = {
  margin: "10px",
  cursor: "pointer"
};

function mapDispatchToProps(dispatch) {
  return {
    vote: (id, option, type) => dispatch(vote(id, option, type))
  };
}

export default connect(undefined, mapDispatchToProps)(Vote);
