import React, { Component } from 'react';
import axios from 'axios';
import { HOSTNAME } from '../../hosts';
//import { QuestionCard } from '../event/Questions';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

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
    //questions.remove((q1 => q1.saved === false))
    this.setState({
      questions,
    });
  }
  
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { user } = this.props.auth;
    //const event = this.props.event;
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
            <li><a href="/user"><i class="black-text material-icons">person</i><span class="black-text">Profile</span></a></li>
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
          <li class="collection-header blue-grey lighten-3"><h4><b>SAVED</b></h4></li>
          </ul>
          <div class="col m6 offset-m3">
          <ul class="collection">
          <li class="collection-item"><div><form class="form-inline">
          <i class="black-text material-icons prefix">search</i>
          <input type="text" class="black-text"></input>
          <button class="btn btn-large waves-effect waves-light hoverable blue accent-3" type="submit">Search</button>
          </form>  </div></li>
          </ul>
          </div>
          {this.state.questions === null && <p>Loading posts...</p>}
          {this.state.questions && this.state.questions.saveBtnText === 'Saved' && this.state.questions.map(question => (
            //<QuestionCard key={question.id} question={question} />
            <Questions />
          ))}
          </div>
    );
    }
}

Questions.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    event: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    event: state.event
  });

  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Questions);