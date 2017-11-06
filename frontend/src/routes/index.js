import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import App from "../components/App";
import Category from "../components/Category";
import Header from "../components/Header";


const routes = (
  <BrowserRouter>
    <div>
      <Header />
      <Route exact path="/" component={App} />
      <Route path="/:cat" component={Category} />
    </div>
  </BrowserRouter>
);

export default routes;
