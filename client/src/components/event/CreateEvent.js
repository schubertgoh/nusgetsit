import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
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
      date: '',
      time: '',
    };
  }
  /*
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  */

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
  
  updateDate(value) {
    this.setState({
      date: value,
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
      date: this.state.date,
      location: this.state.location,
      time: this.state.time,
    });

    this.props.history.push('/events');
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
                    placeholder="Give your event a title."
                  />
                </div>
                <div className="input-field col s12">
                  <label htmlFor="exampleInputEmail1">Description:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => this.updateDescription(e)}
                    className="form-control"
                    placeholder="Write a description of your event."
                  />
                </div>
                <div className="input-field col s12">
                  <label htmlFor="exampleInputEmail1">Location:</label>
                  <input
                    disabled={this.state.disabled}
                    type="text"
                    onBlur={(e) => this.updateLocation(e)}
                    className="form-control"
                    placeholder="Where will you host this event?"
                  />
                </div>
                <div className="input-field col s12">
                  <label htmlFor="exampleInputEmail1">Date:</label>
                  <input
                    disabled={this.state.disabled}
                    type="date"
                    onBlur={(e) => this.updateDate(e)}
                    className="form-control"
                    placeholder="When will this event be held?"
                  />
                </div>
                <div className="input-field col s12">
                  <label htmlFor="exampleInputEmail1">Time:</label>
                  <input
                    disabled={this.state.disabled}
                    type="time"
                    onBlur={(e) => this.updateTime(e)}
                    className="form-control"
                    placeholder="Which time will this event be held?"
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
                  Create Event
                </button>
              </form>
              </div> 
            </div>
          </div>
        </div>
    )
  }
}
/* */
export default withRouter(NewQuestion);