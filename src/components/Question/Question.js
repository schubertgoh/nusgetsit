import React, {Component} from 'react';
import axios from 'axios';
import SubmitAnswer from './SubmitAnswer';

import { HOSTNAME } from '../../hosts'

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
    const {question} = this.state;
    if (question === null) return <p>Loading posts...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h3 className="display-">{question.title}</h3>
            <p className="lead">{question.description}</p>
            <hr className="my-3" />
            <SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer} />
            <p>Comments 💬</p>
            {question.answers.map((answer, idx) => (
            
            <p className="card text-header bg-light "
              // <p className="card text-body bg-light mb-3" 
              
                  key={idx}>❔ AnonUser: {answer.answer}</p>
              ))
            }
          </div>
        </div>
      </div>
    )
  }
}

export default Question;