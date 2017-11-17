import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col } from "reactstrap";
import { getPosts } from "../actions";
import { capitalizer } from "../utils/helpers";

import DisplayList from "./DisplayList";
import ToolBar from "./ToolBar";

class Category extends Component {
  componentDidMount() {
    const { match } = this.props;
    this.props.getPosts(match ? match.params.cat : "");
  }

  render() {
    const { match, posts } = this.props;
    const cat = match ? match.params.cat : "";
    return (
      <div className="App">
        Category Viewer: You are viewing {cat ? capitalizer(cat) : "Main view"}{" "}
        which has {posts.length} posts
        <Container>
          <Row>
            <Col>
              <ToolBar />
            </Col>
          </Row>
          <Row>
            <Col>
              <DisplayList posts={posts} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPosts: cat => dispatch(getPosts(cat))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Category);
