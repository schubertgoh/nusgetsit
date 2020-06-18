import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
class EventPage extends React.Component {
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
  </div>
  );
  }
}
EventPage.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(EventPage);
