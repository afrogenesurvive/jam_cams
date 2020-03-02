import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import './CreateUserForm.css';

const AddModelTKeyForm = (props) => {
const {...model} = props.model;

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridKey">
    <Form.Label>Key:</Form.Label>
    <Form.Control type="text" placeholder="Key"/>
  </Form.Group>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridValue">
    <Form.Label>Value:</Form.Label>
    <Form.Control as="textarea" rows="5" placeholder="Value"/>
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

export default AddModelTKeyForm;
