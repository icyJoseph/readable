import React from "react";
import { Button, ButtonGroup } from "reactstrap";
import { connect } from "react-redux";

import { changeSort } from "../actions";
import { MOST_POPULAR, MOST_HATED, RECENT, OLDEST } from "../constants";

// Export of the Toolbar not connected to React-Redux. This allows us to
// pass any function for changeSort and gain from the onClick without
// dispatching an action
export const ToolBar = ({ changeSort, sortState }) => {
  const options = [
    MOST_POPULAR,
    MOST_HATED,
    RECENT,
    OLDEST
  ].map((option, i) => (
    <Button
      key={i}
      onClick={() => changeSort(option)}
      style={{ cursor: "pointer", margin: "1px" }}
      color={sortState === option ? "info" : "secondary"}
    >
      {option}
    </Button>
  ));
  return (
    <div>
      <ButtonGroup style={{ marginBottom: "15px", marginTop: "15px" }}>
        {options}
      </ButtonGroup>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    sortState: state.sort
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeSort: rule => dispatch(changeSort(rule))
  };
}

// Export of the component connected to Redux
export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
