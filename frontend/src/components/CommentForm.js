import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button
} from "reactstrap";

import { createPost, getCommentByID, editPost, getPostByID } from "../actions";
import { YOUR_COMMENT, AUTHOR, SUBMIT } from "../constants";
import { generateMeta } from "../utils/helpers";

class CommentForm extends Component {
  state = {
    comment: {
      body: "",
      author: ""
    }
  };

  componentDidMount() {
    if (this.props.match) {
      this.props.getCommentByID(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.match) {
      if (
        nextProps.comments.filter(
          comment => comment.id === this.props.match.params.id
        ).length > 0
      ) {
        this.loadCommentInfo(nextProps.comments);
      }
      // If the comment does not exist, throw user back to home
      if (nextProps.comments.length === 0) {
        this.props.history.push("/");
      }
    }
  }

  loadCommentInfo(comments) {
    const [commentInfo] = comments.filter(
      comment => comment.id === this.props.match.params.id
    );
    this.setState({
      comment: {
        body: commentInfo.body,
        author: commentInfo.author
      }
    });
  }

  updateForm(e) {
    this.setState({
      comment: {
        ...this.state.comment,
        ...e
      }
    });
  }

  submitPost() {
    let meta;
    let submission;
    if (this.props.match) {
      meta = { timestamp: Date.now };
      const [comment] = this.props.comments.filter(
        comment => comment.id === this.props.match.params.id
      );
      const parentId = comment.parentId;
      submission = {
        ...meta,
        id: this.props.match.params.id,
        body: this.state.comment.body,
        parentId: parentId
      };
      if (submission.body) {
        this.props.editPost(submission);
        this.props.history.goBack();
      }
    } else {
      meta = generateMeta();
      submission = {
        ...meta,
        ...this.state.comment,
        parentId: this.props.parentId
      };
      if (submission.body && submission.author && submission.parentId) {
        this.props.createPost(submission);
        this.setState({
          comment: {
            body: "",
            author: ""
          }
        });
        this.props.getPostByID(this.props.parentId);
        this.props.toggleForm();
      }
    }
  }

  render() {
    const { comment: { body, author } } = this.state;
    return (
      <Container style={{ width: "50%", marginTop: "5px" }}>
        <Row>
          <Col>
            <FormGroup>
              <Label for="authorText">{AUTHOR}</Label>
              <Input
                value={author}
                onChange={e => this.updateForm({ author: e.target.value })}
                type="text"
                name="text"
                id="authorText"
                disabled={this.props.match ? true : false}
              />
              <Label for="bodyText">{YOUR_COMMENT}:</Label>
              <Input
                value={body}
                onChange={e => this.updateForm({ body: e.target.value })}
                type="textarea"
                name="text"
                id="bodyText"
              />
            </FormGroup>
            <Button onClick={() => this.submitPost()}>{SUBMIT}</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getCommentByID: id => dispatch(getCommentByID(id)),
    getPostByID: parentId => dispatch(getPostByID(parentId)),
    createPost: submission => dispatch(createPost(submission)),
    editPost: submission => dispatch(editPost(submission))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
