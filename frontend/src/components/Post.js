import React, { Component } from "react";
import { connect } from "react-redux";
import { Collapse, Button } from "reactstrap";
import { getPostByID, getComments } from "../actions";
import DisplayList, { DisplayList as CommentsDisplayList } from "./DisplayList";
import CommentForm from "./CommentForm";
import { NEW_COMMENT, MOST_POPULAR } from "../constants";
import { ToolBar as CommentsToolBar } from "./ToolBar";

class Post extends Component {
  state = {
    collapseCommentForm: false,
    rule: MOST_POPULAR
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.props.getPostByID(id);
    this.props.getComments(id);
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.posts.filter(post => post.id === this.props.match.params.id)
        .length === 0
    ) {
      this.props.history.push(`/`);
    }
  }

  changeRule = newRule => {
    this.setState({
      rule: newRule
    });
  };

  toggleCommentForm() {
    this.setState({ collapseCommentForm: !this.state.collapseCommentForm });
  }

  // Because of API response time, sometimes commentCount !== comments.length
  // If that happens, reconcile by:
  reconcilePostInfo(id) {
    this.props.getPostByID(id);
  }

  render() {
    const { posts, comments } = this.props;
    const post = posts.filter(post => post.id === this.props.match.params.id);
    const [commentCount] = post.map(e => e.commentCount);
    const [postID] = post.map(e => e.id);
    if (commentCount) {
      if (commentCount !== comments.length) {
        this.reconcilePostInfo(postID);
      }
    }
    return (
      <div className="App">
        <DisplayList posts={post} />
        <Button color="primary" onClick={this.toggleCommentForm.bind(this)}>
          {NEW_COMMENT}
        </Button>
        <Collapse isOpen={this.state.collapseCommentForm}>
          <CommentForm
            parentId={postID}
            toggleForm={this.toggleCommentForm.bind(this)}
          />
        </Collapse>
        <CommentsToolBar
          changeSort={this.changeRule}
          sortState={this.state.rule}
        />
        <CommentsDisplayList posts={comments} rule={this.state.rule} />
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
