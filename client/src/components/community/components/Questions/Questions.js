import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { HOSTNAME } from "../../../../hosts";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      votes: props.question.votes || 0
    };
  }

  upvote(e) {
    e.preventDefault();

    axios.post(`${HOSTNAME}/upvote/${this.props.question.id}`).then(() => {
      this.setState(prevState => ({
        votes: prevState.votes + 1
      }));
    });
  }

  downvote(e) {
    e.preventDefault();

    axios.post(`${HOSTNAME}/downvote/${this.props.question.id}`).then(() => {
      this.setState(prevState => ({
        // votes: prevState.votes > 0 ? prevState.votes - 1 : 0
      }));
    });
  }

  render() {
    const question = this.props.question;
    return (
      <div key={question.id} className="col-sm-12 col-md-4 col-lg-3">
        <Link
          style={{ textDecoration: "none" }}
          to={`/community/post/${question.id}`}
        >
          <div className="card text-dark bg-light mb-3">
            <h4 className="card-header">{question.title}</h4>

            <p className="card-body">{question.description}</p>

            <div className="card-body">
              <div className="house-container text-left">
                <button
                  className="btn btn-success"
                  onClick={e => {
                    this.upvote(e);
                  }}
                >
                  <i class="material-icons">thumb_up</i>
                </button>
                <span className="badge">{this.state.votes}</span>
                <button
                  className="btn btn-danger"
                  onClick={e => {
                    this.downvote(e);
                  }}
                >
                  <i class="material-icons">thumb_down</i>
                </button>

                <button className="btn btn-transparent">
                  {question.answers} <i class="material-icons">sms</i>
                </button>
                <button
                  className="btn btn-transparent"
                  onClick={e => alert("Shared to your friends!")}
                >
                  Share ↪
                </button>
                <button
                  className="btn btn-transparent"
                  onClick={e => alert("Saved!")}
                >
                  Save <i class="material-icons">save</i>
                </button>
                <button
                  className="btn btn-transparent"
                  onClick={e => alert("Reported!")}
                >
                  Report <i class="material-icons">report_problem</i>
                </button>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null
    };
  }

  async componentDidMount() {
    const questions = (await axios.get(HOSTNAME)).data;
    questions.sort((q1, q2) => q2.votes - q1.votes); // want descending order
    this.setState({
      questions,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          {this.state.questions === null && <p>Loading posts...</p>}
          {this.state.questions &&
            this.state.questions.map(question => (
              <QuestionCard key={question.id} question={question} />
            ))}
        </div>
      </div>
    );
  }
}

export default Questions;
