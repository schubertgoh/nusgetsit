import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import './NavBar2.css';

function NavBar2(props) {

  return (
    <nav className="navbar-toggler navbar-nav bg-info">
      <label class="text-center mb-1 h2">UnknownCommunity ❔</label>
      <label className="navbar-toggler text-right mb-1 h1" to="/">
        420 members 👥
      </label>
      <label className="navbar-toggler text-right mb-1 h1" to="/">
        69 online 🟢
      </label>
      <div id='button'>
      <button 
        class="btn btn-danger text-right mb-1 h3"
        onClick={() => {alert('Joined!')}}>
        Join Community
      </button>
      </div>

    </nav>
  );
}

export default withRouter(NavBar2);