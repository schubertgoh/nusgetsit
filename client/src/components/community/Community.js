import React, { Component } from 'react';
import {Route, withRouter, Switch} from 'react-router-dom';
import NavBar from '../layout/Navbar';
import ComNavBar from './components/ComNavBar/ComNavBar';
import SearchBar from './components/SearchBar/SearchBar';
import Question from './components/Question/Question';
import Questions from './components/Questions/Questions';
import NewQuestion from './components/NewQuestion/NewQuestion';
import './Community.css';

class Community extends Component {
    constructor(props) {
    super(props);
    this.state = {
      community: null,
    };
  }

  render() {
    const {community} = this.state;
    return (
      <div>
        <NavBar/>
        <ComNavBar title={community.title}/>
        <SearchBar/>
        <Switch>
        <Route exact path='/:questionId' component={Questions}/>
        <div><Route exact path='/:questionId/post/:questionId' component={Question}/></div>
        <div><Route path='/:questionId/new-post' component={NewQuestion} /></div>
        </Switch>
      </div>
    );
  }
}

export default withRouter(Community);