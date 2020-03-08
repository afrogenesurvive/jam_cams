import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import './CreateUserForm.css';

const UpdateModelFieldForm = (props) => {
const {...model} = props.model;

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridFieldSelect">
  <Form.Label>Field Options</Form.Label>
  <Form.Control as="select">
    <option>select</option>
    <option>email</option>
    <option>password</option>
    <option>name</option>
    <option>username</option>
    <option>dob</option>
    <option>phone</option>
    <option>address.number</option>
    <option>address.street</option>
    <option>address.town</option>
    <option>address.city</option>
    <option>address.country</option>
    <option>address.postalCode</option>
    <option>bio</option>
    <option>tokens</option>
  </Form.Control>
  </Form.Group>
  </Form.Row>

  {
  // <Form.Row>
  //   <Form.Group as={Col} controlId="formGridField">
  //   <Form.Label>Field</Form.Label>
  //   <Form.Control type="text" placeholder="field"/>
  // </Form.Group>
  // </Form.Row>
  }

  <Form.Row>
  <Form.Group as={Col} controlId="formGridQuery">
    <Form.Label>Query </Form.Label>
    <Form.Label> (Date Format: YYYY-MM-DD) </Form.Label>
    <Form.Control type="text" placeholder="Query"/>
  </Form.Group>
</Form.Row>


<Form.Row>
{props.canCancel && (
  <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
)}
{props.canCancelProfile && (
  <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="primary" className="formButton" type="submit">
  Submit
  </Button>
)}
</Form.Row>

</Form>
</div>

)};

export default UpdateModelFieldForm;
