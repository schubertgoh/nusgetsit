import React from 'react';
import {Link, withRouter} from 'react-router-dom';

function NavBar(props) {

  return (
    <nav className="navbar navbar-dark bg-primary fixed-top">
      <span class="navbar-brand text-center mb-1 h1">NUSGetsIT</span>
      <Link className="navbar-toggler text-right mb-1 h1" to="/">
        Home
      </Link>
      <button 
        className="btn btn-transparent"
        class="navbar-toggler text-right mb-1 h1"
        onClick={() => {alert('Feature not avaliable in demo')}}>
        User69 👤
      </button>
    </nav>
  );
}

export default withRouter(NavBar);