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
        <div className="form-group">
          <input
            type="text"
            onChange={(e) => {this.updateAnswer(e.target.value)}}
            className="form-control"
            placeholder="Post a comment:"
            value={this.state.answer}
          />
        </div>
        <span><button
          class="waves-effect waves-teal btn-flat"
          onClick={() => {this.submit()}}>
          Post
        </button></span>
        <button 
                class="waves-effect waves-teal btn-flat"
                onClick = {(e) => alert('Shared to your friends!')}>Share ↪</button>
                <button 
                class="waves-effect waves-teal btn-flat"
                onClick = {(e) => alert('Saved!')}>Save <i class="material-icons">save</i></button>
                <button 
                class="waves-effect waves-teal btn-flat"
                onClick = {(e) => alert('Reported!')}>Report <i class="material-icons">report_problem</i></button> 
        <hr className="m6" />
      </Fragment>
    )
  }
}

export default withRouter(SubmitAnswer);