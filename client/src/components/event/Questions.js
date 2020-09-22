import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { HOSTNAME } from '../../hosts';
import Reward from 'react-rewards';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
//<Link to={`/events/${question.title}`}>
//<button className="waves-effect waves-teal btn-flat">{question.answers} <i class="material-icons">sms</i></button>
class QuestionCard extends Component {
constructor(props) {
  super(props);
  this.state = {
    votes: props.question.votes || 0,
    reportCount: props.question.reportCount || 0,
    joinCount: props.question.joinCount || 0,
    btnText: 'Join',
    //saveBtnText: 'Save'
  };
}

upvote(e) {
  e.preventDefault();
  this.reward.rewardMe();
  axios.post(`${HOSTNAME}/upvote/${this.props.question.id}`).then(() => {
    this.setState(prevState => ({
      votes: prevState.votes + 1
    }));
  });
}

downvote(e) {
  e.preventDefault();
  this.reward.punishMe();
  axios.post(`${HOSTNAME}/downvote/${this.props.question.id}`).then(() => {
    this.setState(prevState => ({
      votes: prevState.votes > 0 ? prevState.votes - 1 : 0
    }));
  });
}

join(e) {
  e.preventDefault();
  const txt = this.state.btnText;
  axios.post(`${HOSTNAME}`)
    .then(() => {
      if (txt === 'Join') {
      this.setState(prevState => ({
        joinCount: prevState.joinCount + 1,
      }));
      this.setState({btnText: 'Unjoin'});
      alert('Joined Event!');

    } else {
      this.setState(prevState => ({
        joinCount: prevState.joinCount > 0 ? prevState.joinCount - 1 : 0,
      }));
      this.setState({btnText: 'Join'});
      alert('Unjoined!');
    }
    })
}
report(e) {
  e.preventDefault();
  axios.post(`${HOSTNAME}`).then(() => {
    this.setState(prevState => ({
      reportCount: prevState.reportCount + 1
    }));
    alert('Reported!');
  });
}
/*
save(e) {
  e.preventDefault();
  const txt = this.state.saveBtnText;
  axios.post(`${HOSTNAME}`)
    .then(() => {
      if (txt === 'Save') {
      this.setState({saveBtnText: 'Saved'});
      alert('Saved Event!');
    } else {
      this.setState({saveBtnText: 'Save'});
      alert('Unsaved!');
    }
    });
}
*/

render() {
  const question = this.props.question;
  if (this.state.reportCount === 100) {
    return (
    <div key={question.id} className="col s6 offset-s3">
          <div className="blue-grey lighten-4">
              <div className="card-content black-text">
                <h6 className="card-header">this event has been removed.</h6>
              </div>
          </div>
    </div>
    )
  };
  return (
    <div key={question.id} className="col s6 offset-s3">
        <div className="blue-grey lighten-4">
          <div className="card-content black-text">
            <h4 className="card-header">{question.title}</h4>
            <p className="card-body">{question.description}</p>
            <p><b>Location: {question.location}</b></p>
            <p><b>Date: {question.date}</b></p>
            <p><b>Time: {question.time}</b></p>
            <div class="divider"></div>
            <p>{this.state.joinCount} have joined!</p>
            <button class="waves-effect waves-teal btn-flat" onClick={(e) => {this.join(e)}}>{this.state.btnText}</button>
              <div class="divider"></div>
              <Reward
              ref={(ref) => { this.reward = ref }}
              type='confetti'>
              <button class="waves-effect waves-teal btn-flat" onClick={(e) => {this.upvote(e)}
              }><i class="material-icons">thumb_up</i></button>
              </Reward>
              <span className="badge">{this.state.votes}</span>
              <button className="waves-effect waves-teal btn-flat" onClick={(e) => {
                this.downvote(e)
              }}><i class="material-icons">thumb_down</i></button>
              <div class="divider"></div>
              <button
              className="waves-effect waves-teal btn-flat"
              onClick = {(e) => alert('Shared to your friends!')}>Share ↪</button>
              <button
              className="waves-effect waves-teal btn-flat"
              onClick = {(e) => alert('Saved!')}>Save <i class="material-icons right">save</i></button>
              <button
              className="waves-effect waves-teal btn-flat"
              onClick = {(e) => {this.report(e)}}>Report <i class="material-icons right">report_problem</i></button> 
          </div>
        </div>
    </div>
    )
  }
}
//<span className="badge">Reported: {this.state.reportCount}</span>
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
    questions.sort((q1,q2) => q2.votes - q1.votes) // want descending order
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
          style={{fontFamily: "Trebuchet MS"}, {fontVariant: "small-caps"}}>Events</h2>
          </div>
          </div>
          <div class="col m6 offset-m3">
          <ul class="collection">
          <li class="collection-item"><Link to='/new-event'>
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
          </div>
          {this.state.questions === null && <p>Loading posts...</p>}
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
    auth: PropTypes.object.isRequired,
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });

  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Questions);