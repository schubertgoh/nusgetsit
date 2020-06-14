import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link } from "react-router-dom";
class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };
render() {
    const { user } = this.props.auth;
return (
    <div class="row">
      <div class="col s3">
        <ul id="slide-out" class="sidenav-fixed">
        <li><div class="user-view">
        <div class="background">
          <img src="images/office.jpg" />
        </div>
        <a href="#user"><img class="circle" src="images/yuna.jpg" /></a>
        <a href="#name"><span class="white-text name">{user.name.split(" ")[0]}</span></a>
        </div></li>
        <i class="black-text material-icons prefix">search</i>
        <input type="text" class="white-text" ></input>
        <li><a href="#!"><Link to="/"><i class="material-icons">home</i>Home</Link></a></li>
        <li><a href="#!"><i class="material-icons">event</i>Events</a></li>
        <li><a href="#!"><i class="material-icons">bookmark_border</i>Saved</a></li>
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
        <a href="#" data-target="slide-out" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      </div>

      <div class="col s9">
        <ul class="tabs">
          <li class="tab col s3"><a href="#test1">Communities you follow</a></li>
          <li class="tab col s3"><a href="#test2">Trending Communities</a></li>
          <li class="tab col s3"><a href="#test4">Explore Communities</a></li>
        </ul>
      </div>
    </div>
    );
  }
}
Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);