import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

class SubmitAnswer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      answer: '',
    };
  }

  updateAnswer(value) {
    this.setState({
      answer: value,
    });
  }

  submit() {
    this.props.submitAnswer(this.state.answer);

    this.setState({
      answer: '',
    });
  }

  render() {
    return (
      <Fragment>
        <div className="form-group text-left">
         
          <input
            type="text"
            onChange={(e) => {this.updateAnswer(e.target.value)}}
            className="form-control"
            placeholder="Post a comment:"
            value={this.state.answer}
          />
        </div>
        <span><button
          className="btn btn-primary"
          onClick={() => {this.submit()}}>
          Post
        </button></span>
        <button className="btn btn-transparent"
                onClick = {(e) => alert('Shared to your friends!')}>Share ↪️</button>
                <button className="btn btn-transparent"
                onClick = {(e) => alert('Saved!')}>Save 💾</button>
                <button className="btn btn-transparent"
                onClick = {(e) => alert('Reported!')}>Report ⚠️</button> 
        <hr className="my-4" />
      </Fragment>
    )
  }
}

export default withRouter(SubmitAnswer);