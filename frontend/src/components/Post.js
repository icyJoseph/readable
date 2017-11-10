import React, { Component } from "react";
import { connect } from "react-redux";
import { getPostByID, getComments } from "../actions";
import DisplayList from "./DisplayList";

class Post extends Component {
  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.getPostByID(id);
    this.props.getComments(id);
  }
  render() {
    const { posts, comments } = this.props;
    const post = posts.filter (post => post.id === this.props.match.params.id)
    return (
      <div className="App">
        <DisplayList posts={post} />
        <DisplayList posts={comments} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments,
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getPostByID: id => dispatch(getPostByID(id)),
    getComments: id => dispatch(getComments(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);
