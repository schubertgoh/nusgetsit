import React, { Component } from "react";
import { Link } from "react-router-dom";
class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav class=" blue-grey darken-3"> 
          <div className="nav-wrapper">
            <Link
              to="/"
              style={{
                fontFamily: "monospace"
              }}
              className="col s5 brand-logo center white-text"
            >
              <i className="material-icons">group</i>
              NUSGetsIT
            </Link>
          </div>
        </nav>
      </div>
    );
  }
}
export default Navbar;