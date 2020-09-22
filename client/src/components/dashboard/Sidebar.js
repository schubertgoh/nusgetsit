import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Sidebar extends Component {
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
        <div class="section black">
          <div class="row container">
            <h2 class="header white-text"
          style={{fontFamily: "Trebuchet MS"}, {fontVariant: "small-caps"}}>Home</h2>
          </div>
        </div>
        <div class="section white">
          <div class="row container">
          <h3>Hello, <b>{user.name.split(" ")[0]}</b></h3>
          <p>You are logged into the NUSGetsIT app! Hope you have a great session!</p>
          </div>
          </div>
          <div class="section blue-grey lighten-3">
          <div class="row container">
            <h6>Looking for groups with the same interests as you? Access the Communities page!</h6>
            <Link to="/communities"><button
                    style={{
                    width: "175px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                    Communities
                </button>
            </Link>
          <h6>Are you looking to join some fun activities? Head on over to the Events page!</h6>
            <Link to="/events"><button
                    style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                    }}
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                    Events
            </button>
          </Link>
          </div>
          </div>
        </div>
    );
  }
}
Sidebar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Sidebar);
/*<ul class="tabs">
              <li class="tab col s3"><a href="/communities"><span class="black-text">Communities you follow</span></a></li>
              <li class="tab col s3"><a href="/new-community"><span class="black-text">Trending Communities</span></a></li>
              <li class="tab col s3"><a href="/community"><span class="black-text">Explore Communities</span></a></li>             
            </ul>
            */