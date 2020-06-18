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
      description: '',
      location: '',
      time: ''
    };
  }

  updateDescription(value) {
    this.setState({
      description: value,
    });
  }

  updateTitle(value) {
    this.setState({
      title: value,
    });
  }

  updateLocation(value) {
      this.setState({
          location: value,
      })
  }

  updateTime(value) {
      this.setState({
          time: value,
      })
  }

  async submit() {
    this.setState({
      disabled: true,
    });

    await axios.post(HOSTNAME, {
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      time: this.state.time,
    });

    this.props.history.push('/question');
  }

  render() {
    return (
        <div class="row">
          <div class="col s4 m12">
            <div class="card blue-grey darken-3">
              <div class="card-content white-text">
              <span class="card-title">New Event</span>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Title:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => { this.updateTitle(e.target.value) }}
                    className="form-control"
                    placeholder="Give your event a title."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Body:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => { this.updateDescription(e.target.value) }}
                    className="form-control"
                    placeholder="Write a description of your event."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Location:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => { this.updateLocation(e.target.value) }}
                    className="form-control"
                    placeholder="Where will you host this event?"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Time:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => { this.updateTime(e.target.value) }}
                    className="form-control"
                    placeholder="When will this event be held?"
                  />
                </div>
                <Link to="/question"><button
                  disabled={this.state.disabled}
                  style={{
                    width: "200px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                }}
                type="submit"
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                  Create Event
                </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
    )
  }
}

export default withRouter(NewQuestion);