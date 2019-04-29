import React from 'react';
import { Alert, Button, Form, FormGroup, Input, Label } from 'reactstrap';
import * as api from '../utils/helper';
import Header from './Header';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { flashMessage: null, name: '', comments: '' };
    this.submitFeedback = this.submitFeedback.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeComments = this.handleChangeComments.bind(this);
  }

  handleChangeName(e) {
    this.setState({ name: e.target.value });
  }

  handleChangeComments(e) {
    this.setState({ comments: e.target.value });
  }

  clearForm() {
    this.setState({ name: '', comments: '' });
  }

  submitFeedback(e) {
    e.preventDefault();
    return api.post('/api/feedbacks', { feedback: { name: this.state.name, comments: this.state.comments } })
      .then((response) => {
        this.setState({ flashMessage: response });
        this.clearForm();
      }).catch((error) => {
        this.setState({ flashMessage: error.data });
        this.clearForm();
      });
  }

  render() {
    return (
      <div>
        <Header title="Tell us what you think" />
        <Form>
          <FormGroup>
            <Label for="exampleName">Your name:</Label>
            <Input type="name" name="name" id="exampleName" onChange={this.handleChangeName} value={this.state.name} />
          </FormGroup>
          <FormGroup>
            <Label for="Comments">Comments:</Label>
            <Input type="textarea" name="comments" id="Comments" onChange={this.handleChangeComments} value={this.state.comments} />
          </FormGroup>
          <Button onClick={this.submitFeedback}>Submit</Button>
          {this.state.flashMessage &&
          <Alert color={this.state.flashMessage.status}>
            {this.state.flashMessage.message}
          </Alert>
          }
        </Form>
        <br />
        <footer>
          Copyright: Appfolio Inc. Onboarding
        </footer>
      </div>
    );
  }
}

/* TODO: Add Prop Types check*/
