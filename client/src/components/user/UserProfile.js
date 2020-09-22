import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import { HOSTNAME } from '../../hosts';
//import './UserPage.css';
//https://wallpaperhd.wiki/wp-content/uploads/hd-backgrounds-websites-wallpaper-website-background-lines-texture1095.jpg
class UserProfile extends Component {
    constructor(props) {
      super(props);
      this.state = {
        numPosts: 0,
        points: 0,
        awards: 0,
      }
    }
    
    async componentDidMount() {
      const num = (await axios.get(HOSTNAME)).data.length;
      //const qns = JSON.stringify(questions);
      //questions.sort((q1,q2) => q2.votes - q1.votes) // want descending order
        this.setState({
          numPosts: num,
          points: 3 * (num),
          awards: (this.state.points)/100,
        });
    }

    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
    };
    
    render() {
      const { user } = this.props.auth;
      return (
        <div class='row'>
              <ul id="slide-out" class="sidenav sidenav-fixed">
              <li><div class="user-view">
              <a href="#name"><span class="black-text name"><b>Welcome, {user.name}</b></span></a>
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
      <div class="parallax">
      <div class="section black">
        <div class="row container">
          <h2 class="header white-text"
          style={{fontFamily: "Trebuchet MS"}, {fontVariant: "small-caps"}}>User Profile</h2>
          </div>
          </div>
      </div>
      <div class="section white">
        <div class="row container">
          <h3 class="header black-text" style={{fontFamily: "Trebuchet MS"}}>{user.name.split(" ")[0]}</h3>
          <p>Here's an overview of what you have achieved in the NUSGetsIT app!</p>
      <div class="col m4 s12 offset-m4">
      <div class="card cyan lighten-4">
      <span class="card-title black-text left" style={{fontFamily: "Trebuchet MS"}}><i class="medium material-icons left">account_circle</i><b>{user.name.split(" ")[0]}</b></span>
        <div class="card-content right" style={{fontFamily: "system-ui"}}>
              <h5>{this.state.points} Points <i class="material-icons right">star</i></h5>
              <h5>{this.state.numPosts} Posts <i class="material-icons right">chat_bubble</i></h5>
              <h5>Comments <i class="material-icons right">sms</i></h5>
              <h5>{this.state.awards} Awards <i class="material-icons right">emoji_events</i></h5>
        </div>
        </div>
        <p>Make more posts and leave more comments to earn more points and awards!</p>
        </div>
        </div>
        </div>
    <div class="parallax">
      <div class="section black">
        <div class="row container">
          <h3 class="header white-text" style={{fontFamily: "Trebuchet MS"}}>Awards and Titles <i class="material-icons yellow-text" style={{fontSize: '50px'}}>military_tech</i></h3>
          <Link to="/awards">
        <button
                  style={{
                    width: "400px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    marginBottom: "1rem"
                }}
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Click here to see your awards!
        </button>
        </Link>
        </div>
      </div>
    </div>  
    </div> 
        )
    }
}
UserProfile.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(UserProfile);