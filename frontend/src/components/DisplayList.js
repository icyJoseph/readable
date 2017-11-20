import React from "react";
import { connect } from "react-redux";
import { ListGroup, Container, Row, Col } from "reactstrap";
import GenericDisplay from "./GenericDisplay";
import { sortArr } from "../utils/helpers";

// Export of DisplayList disconnected from React-Redux
// This allows us to use the component decoupled from Redux
export const DisplayList = ({ posts, rule, displayBody }) => {
  const sortedPosts = sortArr(posts, rule);
  return (
    <Container>
      <Row>
        <Col>
          <ListGroup>
            {sortedPosts.map(post => (
              <GenericDisplay
                key={post.id}
                post={post}
                displayBody={displayBody}
              />
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

function mapStateToProps(state) {
  return { rule: state.sort };
}

// Export of the component connected to Redux
export default connect(mapStateToProps, null)(DisplayList);
