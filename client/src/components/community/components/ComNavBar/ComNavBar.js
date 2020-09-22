import React from 'react';
import {withRouter} from 'react-router-dom';
import './ComNavBar.css';

import { HOSTNAME } from '../../../../hosts';
import axios from 'axios';


class ComNavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      members: this.props.members || 0,
      btnText: 'Join Community',
      btnColor: '#FF1000' 
    };
  }

  addMember() {
    const txt = this.state.btnText
    axios.post(`${HOSTNAME}`)
      .then(() => {
        if (txt === 'Join Community') {

        this.setState(prevState => ({
          members: prevState.members + 1,
        }))
        this.setState({btnText: 'Unjoin', btnColor: '#1a237e'})
        alert('Joined Community!')

      } else {
        this.setState(prevState => ({
          members: prevState.members > 0 ? prevState.members - 1 : 0,
        }))
        this.setState({btnText: 'Join Community', btnColor: '#FF1000'})
        alert('Unjoined!')
      }
      })
    
  }


render() {
    const title = this.props.title;
  return (
    <nav className="navbar-toggler navbar-nav bg-info">
      <label class="text-center mb-1 h1">{title.title} </label>
      <label className="navbar-toggler text-right mb-1 h1" to="/">
      {this.state.members} members <i class="large material-icons">group</i>
      </label>
      <label className="navbar-toggler text-right mb-1 h1" to="/">
        {this.state.members} online <i class="large material-icons">adjust</i>
      </label>
      <div id='button'>
      <button 
        class="btn btn-danger text-right mb-1 h3"
        onClick={() => {this.addMember()}}>
        Join Community
      </button>
      </div>
    </nav>
  )
}
}

export default withRouter(ComNavBar);