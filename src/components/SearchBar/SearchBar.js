import React from 'react';
import {Link, withRouter} from 'react-router-dom';

function SearchBar(props) {

  return (
    <nav class="navbar navbar-toggler bg-light">
      <Link to='/new-question'>
      <span className="btn btn-primary">
      Post Something
      </span>
      </Link>
      <label className="navbar text-right mb-1 h2" to="/">
        Posts 🔄
      </label>
    <form class="form-inline">
      <input class="form-control mr-sm-2" 
        type="search" 
        placeholder="Search for a post" 
        aria-label="Search">
      </input>
      <button class="btn btn-primary my-2 my-sm-0" type="submit">Search</button>
    </form>
    
  </nav>
    
  );
}

export default withRouter(SearchBar);
