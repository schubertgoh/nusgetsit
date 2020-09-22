import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import './App.css';

import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";

import CreateEvent from './components/event/CreateEvent';
import Event from './components/event/Event';
import Questions from './components/event/Questions';
import EventPage from './components/event/EventPage';
import Sidebar from './components/dashboard/Sidebar';

import CreateCommunity from './components/community/CreateCommunity';
import Community from './components/community/Community';
import Communities from './components/community/Communities';
import CommunityList from './components/community/CommunityList';
import UserProfile from './components/user/UserProfile';
import EditProfile from './components/user/EditProfile';
import Awards from './components/user/Awards';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />



            <Switch>
              <PrivateRoute exact path="/dashboard" component={Sidebar} />
              <PrivateRoute exact path="/user" component={UserProfile} />
              <PrivateRoute exact path="/saved" component={EditProfile} />
              
              <PrivateRoute exact path="/awards" component={Awards} />  
              
              <div>
              <PrivateRoute exact path="/event" component={EventPage} />
              <PrivateRoute exact path='/events' component={Questions}/>
              <div><PrivateRoute exact path='/events/:questionId' component={Event}/></div>
              <div><PrivateRoute path='/new-event'component={CreateEvent} /></div>
              </div>
             </Switch>

             <Switch>
              <div>
              <PrivateRoute exact path="/communities" component={Communities} />
              <PrivateRoute exact path='/community' component={CommunityList}/>
              <div><PrivateRoute exact path='/communities/:questionId' component={Community}/></div>
              <div><PrivateRoute path='/new-community'component={CreateCommunity} /></div>
              </div>
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;