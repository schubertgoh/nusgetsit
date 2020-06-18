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
      votes: props.question.votes || 0 
    }
  }


  upvote(e) {
    e.preventDefault();

    axios.post(`${HOSTNAME}/upvote/${this.props.question.id}`)
      .then(() => {
        this.setState(prevState => ({
          votes: prevState.votes + 1
        }))
      })

  }

  downvote(e) {
    e.preventDefault();

    axios.post(`${HOSTNAME}/downvote/${this.props.question.id}`)
      .then(() => {
        this.setState(prevState => ({
          votes: prevState.votes > 0 ? prevState.votes - 1 : 0
        }))
      })

  }

  render() {
    const question = this.props.question;
    return (
      <div key={question.id} className="col s12 m4 l3">
        <Link style={{ textDecoration: 'none' }} to={`/question/${question.id}`}>
          <div className="card text-dark bg-light mb-3">
           
              <h4 className="card-header">{question.title}</h4>
              <p className="card-body">{question.description}</p>
          
            <div className="card-body">
              <div className="house-container text-centre">
                <button className="btn btn-success" onClick={(e) => {
                  this.upvote(e)
                }}>👍</button>
                <span className="badge">{this.state.votes}</span>
                <button className="btn btn-danger" onClick={(e) => {
                  this.downvote(e)
                }}>👎</button>

                <button>{question.answers} 💬</button>
                <button
                onClick = {(e) => alert('Shared to your friends!')}>Share ↪️</button>
                <button
                onClick = {(e) => alert('Saved!')}>Save 💾</button>
                <button
                onClick = {(e) => alert('Reported!')}>Report ⚠️</button>  
              </div>
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
      questions: null,
    };
  }

  async componentDidMount() {
    const questions = (await axios.get(HOSTNAME)).data;
    questions.sort((q1,q2) => q2.votes - q1.votes) // want descending order
    this.setState({
      questions,
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
            <li><a href="/eventpage"><i class="black-text material-icons">event</i><span class="black-text">Events</span></a></li>
            <li><a href="#!"><i class="black-text material-icons">bookmark_border</i><span class="black-text">Saved</span></a></li>
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
<ul class="collection with-header">
<li class="collection-header blue-grey lighten-3"><h4>Events</h4></li>
<li class="collection-item"><Link to='/new-question'>
  <button
              style={{
                width: "250px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem"
            }}
            type="submit"
            className="btn btn-large waves-effect waves-light hoverable blue accent-3">
              Create an Event
            </button>
  </Link></li>
<li class="collection-item"><div><form class="form-inline">
  <i class="black-text material-icons prefix">search</i>
  <input type="text" class="black-text" ></input>
  <button class="btn btn-large waves-effect waves-light hoverable blue accent-3" type="submit">Search</button>
</form>  </div></li>
</ul>
          {this.state.questions === null && <p>Loading posts...</p>}
          {this.state.questions && this.state.questions.map(question => (
            <QuestionCard key={question.id} question={question} />
          ))}
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