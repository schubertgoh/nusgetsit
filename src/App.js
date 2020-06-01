import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import NavBar2 from './components/NavBar2/NavBar2';
import SearchBar from './components/SearchBar/SearchBar';
import Question from './components/Question/Question';
import Questions from './components/Questions/Questions';
import NewQuestion from './components/NewQuestion/NewQuestion';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <NavBar2/>
        <SearchBar/>
        <Route exact path='/' component={Questions}/>
        <div><Route exact path='/question/:questionId' component={Question}/></div>
        <div><Route path='/new-question'
                      component={NewQuestion} /></div>
      </div>
    );
  }
}

export default withRouter(App);