import React, { Component } from "react";

class Category extends Component {
  render() {
    const { match: { params: {cat} } } = this.props;
    return <div>Category Viewer: You are viewing {cat}</div>;
  }
}

export default Category;
