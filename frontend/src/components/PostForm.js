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

import {
  getAllCategories,
  createPost,
  getPostByID,
  editPost
} from "../actions";
import {
  TITLE,
  BODY,
  AUTHOR,
  CATEGORY,
  SUBMIT,
  SELECT_HOLDER
} from "../constants";

import { capitalizer, generateMeta } from "../utils/helpers";

class PostForm extends Component {
  state = {
    post: {
      title: "",
      body: "",
      author: "",
      category: ""
    }
  };

  componentDidMount() {
    this.props.getAllCategories();
    if (this.props.match.params.id) {
      this.props.getPostByID(this.props.match.params.id);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.posts.filter(post => post.id === this.props.match.params.id)
        .length > 0
    ) {
      this.loadPostInfo(nextProps.posts);
    }
    // If no posts exist in the next props, then throw back to home
    if (nextProps.posts.length === 0 && !this.props.match.params) {
      this.props.history.push("/");
    }
    if (!nextProps.match.params.id) {
      this.setState({
        post: {
          title: "",
          body: "",
          author: "",
          category: ""
        }
      });
    }
  }

  loadPostInfo(posts) {
    const [postInfo] = posts.filter(
      post => post.id === this.props.match.params.id
    );
    this.setState({
      post: {
        title: postInfo.title,
        body: postInfo.body,
        author: postInfo.author,
        category: postInfo.category
      }
    });
  }

  updateForm(e) {
    this.setState({
      post: {
        ...this.state.post,
        ...e
      }
    });
  }

  submitPost() {
    // If it is a new post
    let submission;
    if (!this.props.match.params.id) {
      const meta = generateMeta();
      submission = {
        ...meta,
        ...this.state.post
      };
    } else {
      // Else we take the updated files from the inputs and the other meta data
      const [post] = this.props.posts.filter(
        post => post.id === this.props.match.params.id
      );
      submission = {
        ...post,
        ...this.state.post
      };
    }
    // If the fields are not empty
    if (
      submission.title &&
      submission.body &&
      submission.author &&
      submission.category
    ) {
      // if it is a new post
      if (!this.props.match.params.id) {
        this.props.postSubmission(submission);
      } else {
        // if it user edits a post
        this.props.editPost(submission);
      }
      this.props.history.push(`/${submission.category}/${submission.id}`);
    }
  }

  render() {
    const { categories } = this.props;
    const { post: { title, body, author, category } } = this.state;
    return (
      <Container>
        <Row>
          <Col>
            <FormGroup>
              <Label for="titleText">{TITLE}</Label>
              <Input
                value={title}
                onChange={e => this.updateForm({ title: e.target.value })}
                type="text"
                name="text"
                id="titleText"
              />
              <Label for="authorText">{AUTHOR}</Label>
              <Input
                value={author}
                onChange={e => this.updateForm({ author: e.target.value })}
                type="text"
                name="text"
                id="authorText"
                disabled={this.props.match.params.id ? true : false}
              />
              <Label for="bodyText">{BODY}</Label>
              <Input
                value={body}
                onChange={e => this.updateForm({ body: e.target.value })}
                type="textarea"
                name="text"
                id="bodyText"
              />
              <Label for="categoryText">{CATEGORY}</Label>
              <Input
                value={category}
                onChange={e => this.updateForm({ category: e.target.value })}
                type="select"
                name="select"
                id="categoryText"
                disabled={this.props.match.params.id ? true : false}
              >
                <option>{SELECT_HOLDER}</option>
                {categories.map(cat => (
                  <option value={cat.name} key={cat.name}>
                    {capitalizer(cat.name)}
                  </option>
                ))}
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={() => this.submitPost()}>{SUBMIT}</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    posts: state.posts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => dispatch(getAllCategories),
    postSubmission: submission => dispatch(createPost(submission)),
    getPostByID: id => dispatch(getPostByID(id)),
    editPost: submission => dispatch(editPost(submission))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
