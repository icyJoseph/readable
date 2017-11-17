import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../components/App";
import Category from "../components/Category";
import Header from "../components/Header";
import Post from "../components/Post";
import PostForm from "../components/PostForm";
import CommentForm from "../components/CommentForm";

const routes = (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/newpost" component={PostForm} />
        <Route path="/editpost/:id" component={PostForm} />
        <Route path="/editcomment/:id" component={CommentForm} />
        <Route path="/:cat/:id" component={Post} />
        <Route path="/:cat" component={Category} />
        <Route exact path="/" component={App} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default routes;
