import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Event = props => (
    <div class="row">
    <div class="col s12 m6">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">{props.event.event_title}</span>
          <p>{props.event.event_description}</p>
          <p><b>Location: </b>{props.event.event_location}</p>
          <p><b>Time: </b>{props.event.event_time}</p>
        </div>
      </div>
    </div>
  </div>
)
export default class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {events: []};
    }
    componentDidMount() {
        axios.get('/events/')
            .then(response => {
                this.setState({ events: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }
    eventRundown() {
        return this.state.events.map(function(currentEvent, i){
            return <Event event={currentEvent} key={i} />;
        })
    }
    render() {
        return (
            <div class="row">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <Link to="/createevent"><button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Create Event
                </button>
                </Link>
                <div>
                  <h3>List of Events</h3>
                  <body>{this.eventRundown()}</body>
                </div>
            </div>
        </div>
        )
    }
}
