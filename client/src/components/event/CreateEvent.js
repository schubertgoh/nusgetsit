import React, {Component} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class CreateEvent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            event_title: '',
            event_location: '',
            event_time: '',
            event_description: '',
            event_completed: false
        }
        this.onChangeEventTitle = this.onChangeEventTitle.bind(this);
        this.onChangeEventLocation = this.onChangeEventLocation.bind(this);
        this.onChangeEventTime = this.onChangeEventTime.bind(this);
        this.onChangeEventDescription = this.onChangeEventDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangeEventTitle(e) {
        this.setState({
            event_title: e.target.value
        });
    }

    onChangeEventLocation(e) {
        this.setState({
            event_location: e.target.value
        });
    }

    onChangeEventTime(e) {
        this.setState({
            event_time: e.target.value
        });
    }

    onChangeEventDescription(e) {
        this.setState({
            event_description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Event Created:`);
        console.log(`Event Title: ${this.state.event_title}`);
        console.log(`Event Location: ${this.state.event_location}`);
        console.log(`Event Time: ${this.state.event_time}`);
        console.log(`Event Description: ${this.state.event_description}`);
        
        const newEvent = {
            event_title: this.state.event_title,
            event_description: this.state.event_description,
            event_location: this.state.event_location,
            event_time: this.state.event_time,
            event_completed: this.state.event_completed
        };

        axios.post('http://localhost:4000/events', newEvent)
            .then(res => console.log(res.data));
        
        this.setState({
            event_title: '',
            event_location: '',
            event_time: '',
            event_description: '',
            todo_completed: false
        })
    }

    render() {
        return (
            <div className="container">
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <Link to="/events" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              Events
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Create an Event</b> below
              </h4>
            </div>
            <form  onSubmit={this.onSubmit}>
                <div className="input-field col s12">
                <input
                  onChange={this.onChangeEventTitle}
                  value={this.state.event_title}
                  id="text"
                  type="text"
                  className="form-control"
                />
                <label htmlFor="describe">Title</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChangeEventDescription}
                  value={this.state.event_description}
                  id="text"
                  type="text"
                  className="form-control"
                />
                <label htmlFor="describe">Description</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChangeEventLocation}
                  value={this.state.event_location}
                  id="location"
                  type="location"
                  className="form-control"
                />
                <label htmlFor="location">Location</label>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChangeEventTime}
                  value={this.state.event_time}
                  id="time"
                  type="time"
                  className="form-control"
                />
                <label htmlFor="time">Time</label>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
        )
    }
}
export default CreateEvent;