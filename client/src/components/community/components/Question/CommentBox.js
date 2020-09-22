import React, {Component} from 'react';

import axios from 'axios';

import { HOSTNAME } from '../../../../hosts';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.likes || 0,
      answer: this.props.answer,
      id: this.props.id
    }
  }

//   increamentCounter = (increamentValue) =>{
//     this.setState((prevState) => ({
//       likes: prevState.likes + increamentValue
//     }));
// }


  upvote(e) {
    e.preventDefault();
    
    axios.post(`${HOSTNAME}`)
      .then(() => {
        this.setState(prevState => ({
          likes: prevState.likes + 1
        }))
      })
    
  }

  downvote(e) {
    e.preventDefault();
   
    axios.post(`${HOSTNAME}`)
      .then(() => {
        this.setState(prevState => ({
          likes: prevState.likes - 1
        }))
      })
    
  }

  render() {
    const {user} = this.props.auth;
    return (
      <div className="card bg-light mb-3">
            <h6 className="card-header"><i class="material-icons">account_circle</i><b>{user.name.split(" ")[0]}</b></h6>
            <p className="card-body">{this.state.answer}</p>

           
              <div className="house-container text-left">
                <button className="btn btn" onClick={(e) => {
                  this.upvote(e)
                }}><i class="material-icons">thumb_up</i></button>
                <span className="badge">{this.state.likes}</span>
                <button className="btn btn" onClick={(e) => {
                  this.downvote(e)
                }}><i class="material-icons">thumb_down</i></button>

                <button className="btn btn-transparent"
                onClick = {(e) => alert('Shared to your friends!')}>Reply <i class="material-icons">reply</i></button>
                <button className="btn btn-transparent"
                onClick = {(e) => alert('Shared to your friends!')}>Share ↪</button>
                <button className="btn btn-transparent"
                onClick = {(e) => alert('Saved!')}>Save <i class="material-icons">save</i></button>
                <button className="btn btn-transparent"
                onClick = {(e) => alert('Reported!')}>Report <i class="material-icons">report_problem</i></button> 

              </div>
            </div>
       
    )
  }
}

export default CommentBox;
