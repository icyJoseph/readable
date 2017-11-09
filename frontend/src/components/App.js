import React, { Component } from "react";
import "./App.css";
import Category from "./Category";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
          <Category />
        </div>
      </div>
    );
  }
}

export default App;
