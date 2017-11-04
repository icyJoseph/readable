import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllCategories } from "../actions";
import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.getAllCategories();
  }
  render() {
    const { categories } = this.props;
    return (
      <div className="App">
        Categories:{" "}
        {categories &&
          categories.map((cat, i) => <span key={i}> {cat.name} </span>)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return { getAllCategories: () => dispatch(getAllCategories) };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
