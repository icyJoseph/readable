import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "../components/App";
import Category from "../components/Category";
import Header from "../components/Header";
import Post from "../components/Post";

const routes = (
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path="/" component={App} />
      <Route exact path="/:cat" component={Category} />
      <Route path="/:cat/:id" component={Post} />
    </div>
  </BrowserRouter>
);

export default routes;
