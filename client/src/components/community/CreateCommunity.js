import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import { HOSTNAME } from '../../hosts';

class NewQuestion extends Component {
  constructor(props) {
    super(props);

    this.state = {
      disabled: false,
      title: '',
      info: '',
      memberCount: this.props.memberCount || 0,
    };
  }

  updateInfo(value) {
    this.setState({
      info: value,
    });
  }

  updateTitle(value) {
    this.setState({
      title: value,
    });
  }

  async submit() {
    this.setState({
      disabled: true,
    });

    await axios.post(HOSTNAME, {
      title: this.state.title,
      info: this.state.description,
      memberCount: this.state.memberCount,
    });

    this.props.history.push('/communities');
  }

  render() {
    return (
        <div class="row">
          <div class="col s4 m12">
            <div class="card blue-grey darken-1">
              <div class="card-content white-text">
              <span class="card-title">New Event</span>
              <form>
                <div className="input-field col s12">
                  <label htmlFor="exampleInputEmail1">Title:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => this.updateTitle(e)}
                    className="form-control"
                    placeholder="Give your community a title."
                  />
                </div>
                <div className="input-field col s12">
                  <label htmlFor="exampleInputEmail1">Description:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => this.updateInfo(e)}
                    className="form-control"
                    placeholder="Write a description of your community."
                  />
                </div>
                <button
                  disabled={this.state.disabled}
                  style={{
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                onClick={() => {this.submit()}}>
                  Create Community
                </button>
              </form>
              </div> 
            </div>
          </div>
        </div>
    )
  }
}

export default withRouter(NewQuestion);