import React, { Component } from "react";
import { connect } from "react-redux";
import { getPosts } from "../actions";
import { capitalizer } from "../utils/helpers";

import PostsList from "./PostsList";

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
        <PostsList posts={posts} />
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
