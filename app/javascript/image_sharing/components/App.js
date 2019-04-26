import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import Header from './Header';

export default function App() {
  return (
    <div>
      <Header title="Tell us what you think" />
      <Form>
        <FormGroup>
          <Label for="exampleName">Your name:</Label>
          <Input type="name" name="name" id="exampleName" />
        </FormGroup>
        <FormGroup>
          <Label for="exampleComments">Comments:</Label>
          <Input type="textarea" name="comments" id="exampleComments" />
        </FormGroup>
        <Button>Submit</Button>
      </Form>
      <footer>
        Copyright: Appfolio Inc. Onboarding
      </footer>
    </div>
  );
}

/* TODO: Add Prop Types check*/
