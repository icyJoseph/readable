import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

import { getAllCategories, getPosts } from "../actions";

import { capitalizer } from "../utils/helpers";

class Header extends Component {
  state = {
    openNavBar: false
  };

  toggle = () => {
    this.setState(prevState => ({
      openNavBar: !prevState.openNavBar
    }));
  };

  componentDidMount() {
    this.props.getAllCategories();
  }

  fetchPosts(cat) {
    this.props.getPosts(cat);
  }

  renderNavLinks(categories) {
    return categories.map((cat, i) => (
      <NavItem key={i}>
        <NavLink
          to={`/${cat.path}`}
          tag={RRNavLink}
          onClick={() => this.fetchPosts(cat.name)}
        >
          {capitalizer(cat.name)}
        </NavLink>
      </NavItem>
    ));
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <Navbar color="faded" light expand="md">
          <NavbarBrand to="/" tag={RRNavLink}>
            {" "}
            Readable Home{" "}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.openNavBar} navbar>
            <Nav className="ml-auto">{this.renderNavLinks(categories)}</Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllCategories: () => dispatch(getAllCategories),
    getPosts: cat => dispatch(getPosts(cat))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
