import React, {Component} from 'react';
import axios from 'axios';
//import SubmitAnswer from './SubmitAnswer';
import { HOSTNAME } from '../../hosts';

import PropTypes from "prop-types";
import { connect } from "react-redux";
//{question.answer.map(answer => 
//<//p class="black-text left"><b>{user.name.split("")[0]}: </b>{answer.answer}</p>
//)}
/*<SubmitAnswer questionId={question.id} submitAnswer={this.submitAnswer} />
                <p>Comments <i class="material-icons">sms</i></p>
                <div class="divider"></div>
                <p class="black-text left"><b>{user.name.split("")[0]}: </b>{question.answer}</p>
                */
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
    const { match: { params } } = this.props;
    const { question } = (await axios.get(`${HOSTNAME}/${params.questionId}`)).data;
    this.setState({
      question,
    });
  }

  async submitAnswer(answer) {
    axios.post(`${HOSTNAME}/events/${this.state.question.id}`).then(() => {
      this.setState(prevState => ({
        comments: prevState.comments + 1
      }));
    });
    await axios.post(`${HOSTNAME}/answer/${this.state.question.id}`, {
      answer,
    });
    await this.refreshQuestion();
  }

  render() {
    const question = this.state;
    if (question === null) return <p>Loading posts...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="col s12 m6 offset-m3">
          <div class="card blue-grey lighten-2">
              <div class="card-content black-text">
                <h4 class="card title">{question.title}</h4>
                <p>{question.description}</p>
                <p><b>Location: </b>{question.location}</p>
                <p><b>Time: </b>{question.time}</p>
                <hr className="m3" />
              </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}
Question.propTypes = {
  question: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  question: state.question
});

export default connect(mapStateToProps)(Question);
