import React, {Component} from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';
import { HOSTNAME } from '../../hosts';

class Question extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: null,
    };

    this.submitAnswer = this.submitAnswer.bind(this);
  }

  async componentDidMount() {
    await this.refreshQuestion();
  }

  async refreshQuestion() {
    const { match: { params } } = this.props;
    const question = (await axios.get(`${HOSTNAME}/${params.questionId}`)).data;
    this.setState({
      question,
    });
  }

  async submitAnswer(answer) {
    await axios.post(`${HOSTNAME}/answer/${this.state.question.id}`, {
      answer,
    });
    await this.refreshQuestion();
  }

  render() {
    const { user } = this.props.auth;
    const {question} = this.state;
    if (question === null) return <p>Loading posts...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
          <div class="card blue-grey darken-3">
              <div class="card-content white-text">
                <span class="card title">{question.title}</span>
                <p>{question.description}</p>
                <hr className="my-3" />
                <SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer} />
                <p>Comments 💬</p>
                {question.answers.map((answer, idx) => (
                <p className="black-text">
                      <b>{user.name.split(" ")[0]}</b>: {answer.answer}</p>
                  ))
                }
              </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Question;