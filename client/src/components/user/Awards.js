import PostFirst from './awards/PostFirst.PNG'
import Posts10 from './awards/10Posts.PNG'
import Posts25 from './awards/25Posts.PNG'
import Posts50 from './awards/50Posts.PNG'
import Posts100 from './awards/100Posts.PNG'
import Points10 from './awards/10Pts.png'
import Points25 from './awards/25Pts.png'
import Points50 from './awards/50Pts.png'
import Points100 from './awards/100Pts.png'
import Points200 from './awards/200Pts.png'


import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import axios from 'axios';
import { HOSTNAME } from '../../hosts';

class Awards extends Component {
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
          awards: 0,
        });
    }

    onLogoutClick = e => {
      e.preventDefault();
      this.props.logoutUser();
    };

    getPostOne()  {
        
        return(
        <div>
        <img src={PostFirst} alt="PostFirst" />
        <h6>
        {"\n"}
        </h6>
        </div>
        )
    }

    getPost10()  {
        return(
        <div>   
        <img src={Posts10} alt="PostsTen" />
        <h6>
        {"\n"}
        </h6>
        </div>
        )
    }
    
    getPost25()  {
        return(
            <div> 
            <img src={Posts25} alt="Posts25" />
            <h6>
            {"\n"}
            </h6>
            </div>
    
        )
    }

    getPost50()  {
        return(
            <div>
            <img src={Posts50} alt="Posts50" />
            <h6>
            {"\n"}
            </h6>
            </div>    
        )
    }

    getPost100()  {
        return(
            <div>
            <img src={Posts100} alt="Posts100" />
            <h6>
            {"\n"}
            </h6>
            </div>
        )
    }

    getPoints10()  {
        return(
        <div>
        <img src={Points10} alt="Points10" />
        <h6>
        {"\n"}
        </h6>
        </div>
        )
    }

    getPoints25()  {
        return(
        <div>
        <img src={Points25} alt="Points25" />
        <h6>
        {"\n"}
        </h6>
        </div>
        )
    }

    getPoints50()  {
        return(
        <div>
        <img src={Points50} alt="Points50" />
        <h6>
        {"\n"}
        </h6>
        </div>
        )
    }

    getPoints100()  {
        return(
        <div>
        <img src={Points100} alt="Points100" />
        <h6>
        {"\n"}
        </h6>
        </div>
        )
    }
    
    getPoints200()  {
        return(
        <div>
        <img src={Points200} alt="Points200" />
        <h6>
        {"\n"}
        </h6>
        </div>
        )
    }

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
          style={{fontFamily: "Trebuchet MS"}, {fontVariant: "small-caps"}}>Awards and Titles</h2>
          </div>
          </div>
        </div>

        <h4 class="header black-text" style={{fontFamily: "Trebuchet MS"}}>You have unlocked {this.state.awards}/10 awards</h4>

        <h3 class="header black-text" style={{fontFamily: "Trebuchet MS"}}>UNLOCKED:</h3>

        <div>{this.state.numPosts >= 1 ? this.getPostOne() : null}</div>
        <div>{this.state.numPosts >= 10 ? this.getPostTen() : null}</div>
        <div>{this.state.numPosts >= 25 ? this.getPost25() : null}</div>
        <div>{this.state.numPosts >= 50 ? this.getPost50() : null}</div>
        <div>{this.state.numPosts >= 100 ? this.getPost100() : null}</div>

        <div>{this.state.points >= 10 ? this.getPoints10() : null}</div>
        <div>{this.state.points >= 25 ? this.getPoints25() : null}</div>
        <div>{this.state.points >= 50 ? this.getPoints50() : null}</div>
        <div>{this.state.points >= 100 ? this.getPoints100() : null}</div>
        <div>{this.state.points >= 200 ? this.getPoints200() : null}</div>

        </div>
        
        
        )
    }
}
Awards.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth
  });
  export default connect(
    mapStateToProps,
    { logoutUser }
  )(Awards);