import React, { Component } from "react";
import axios from "axios";
import SubmitAnswer from "./SubmitAnswer";

import { HOSTNAME } from "../../../../hosts";
import CommentBox from "./CommentBox";


class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
      comments: this.props.comments || 0
    };

    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const {
      match: { params }
    } = this.props;
    const question = (await axios.get(`${HOSTNAME}/${params.questionId}`)).data;
    this.setState({
      question
    });
  }

  async submitAnswer(answer) {
    axios.post(`${HOSTNAME}/community/post/${this.state.question.id}`).then(() => {
      this.setState(prevState => ({
        comments: prevState.comments + 1
      }));
    });
    await axios.post(`${HOSTNAME}/community/post/${this.state.question.id}`, {
      answer
    });

    await this.refreshQuestion();
  }

  render() {
    const { question } = this.state;
    const { user } = this.props.auth;
    
    if (question === null) return <p>Loading posts...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h5 className="display-">By: <b>{user.name.split(" ")[0]}</b></h5>
            <h3 className="display-">{question.title}</h3>
            <p className="lead">{question.description}</p>
            <hr className="my-3" />
            <SubmitAnswer
              questionId={question.id}
              submitAnswer={this.submitAnswer}
            />
            <p>
              Comments <i class="material-icons">sms</i> ( {this.state.comments} )
            </p>
            {question.answer.map((answer, idx) => (
              <CommentBox answer={answer.answer} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Question;
