import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HOSTNAME } from '../../hosts';

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null
    };
  }

  render() {
    const question = this.props.question;
    return (
      <div key={question.id} className="col s12 m4 l3">
        <Link style={{ textDecoration: 'none' }} to={`/communities/${question.id}`}>
          <div className="card text-dark bg-light mb-3">
           
              <h4 className="card-header">{question.title}</h4>
              <p className="card-body">{question.info}</p>
          
            <div className="card-body">
              
            </div>
          </div>
        </Link>
      </div>
    )
  }
}

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: []
    };
  }

  async componentDidMount() {
    const questions = (await axios.get(HOSTNAME)).data;
    //const qns = JSON.stringify(questions);
    // questions.sort((q1,q2) => q2.votes - q1.votes) // want descending order
    this.setState({
     questions: [questions],
    });
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
  
  render() {
    const { user } = this.props.auth;
    return (
      <div class="row">
      <ul id="slide-out" class="sidenav sidenav-fixed">
      <li><div class="user-view">
      <a href="#name"><span class="black-text name">Welcome, <b>{user.name.split(" ")[0]}</b></span></a>
      </div></li>
      <li><i class="black-text material-icons prefix">search</i>
      <input type="text" class="black-text" ></input></li>
      <li><a href="/dashboard"><i class="black-text material-icons">home</i><span class="black-text">Home</span></a></li>
      <li><a href="/events"><i class="black-text material-icons">event</i><span class="black-text">Events</span></a></li>
      <li><a href="/communities"><i class="black-text material-icons">forum</i><span class="black-text">Communities</span></a></li>
    <li><a href="/user"><i class="black-text material-icons">person</i><span class="black-text">{user.name}</span></a></li>
      <li><div class="divider"></div></li>
      <button
              style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
              }}
              onClick={this.onLogoutClick}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
          >
              Logout
          </button>
      </ul>
  
  <div class="section black">
  <div class="row container">
    <h2 class="header white-text"
    style={{fontFamily: "Trebuchet MS"}, {fontVariant: "small-caps"}}>Communities</h2>
    </div>
    </div>
    <div class="col m6 offset-m3">
    <ul class="collection">
    <li class="collection-item"><Link to='/new-community'>
    <button
        style={{
          width: "250px",
          borderRadius: "3px",
          letterSpacing: "1.5px",
          marginTop: "1rem"
      }}
      type="submit"
      className="btn btn-large waves-effect waves-light hoverable blue accent-3">
        Create a Community
    </button>
    </Link></li>
    <li class="collection-item"><div><form class="form-inline">
    <i class="black-text material-icons prefix">search</i>
    <input type="text" class="black-text" ></input>
    <button class="btn btn-large waves-effect waves-light hoverable blue accent-3" type="submit">Search</button>
    </form></div></li>
    </ul>
    </div>
    {this.state.questions === null && <p>Loading...</p>}

    <React.Fragment>
    {this.state.questions && this.state.questions.map(question => 
      <QuestionCard key={question.id} question={question} />
    )}
    </React.Fragment>
  </div>
    )
  }
}

Questions.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Questions);