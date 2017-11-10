import React from "react";
import { ListGroup } from "reactstrap";
import GenericDisplay from "./GenericDisplay";

const DisplayList = ({ posts }) => {
  return <ListGroup>{posts.map(post => <GenericDisplay key={post.id} post={post} />)}</ListGroup>;
};

export default DisplayList;
