import React, { Component } from "react";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";

class Header extends Component {
  state = {
    openNavBar: false
  };

  toggle = () => {
    this.setState(prevState => ({
      openNavBar: !prevState.openNavBar
    }));
  };

  renderNavLinks(categories) {
    return categories.map((cat, i) => {
      <NavItem key={i}>
        <NavLink>{cat.name}</NavLink>
      </NavItem>;
    });
  }

  render() {
    const { categories } = this.props;
    return (
      <div>
        <Navbar>
          <NavbarBrand>
            <NavbarToggler>
              <Collapse>
                <Nav>{renderNavLinks(categories)}</Nav>
              </Collapse>
            </NavbarToggler>
          </NavbarBrand>
        </Navbar>
      </div>
    );
  }
}
