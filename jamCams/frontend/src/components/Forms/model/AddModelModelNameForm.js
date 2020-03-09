import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import './CreateUserForm.css';

const AddModelModelNameForm = (props) => {
  const {...model} = props.model;
  const modelNameList = JSON.stringify(model.modelNames)

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>

  <Form.Row>
  <h6>Current Names:</h6>
  <p>{modelNameList}</p>
  </Form.Row>

  <Form.Row>
    <Form.Group as={Col} controlId="formGridModelName">
    <Form.Label>Modelname</Form.Label>
    <Form.Control type="text" placeholder="Modelname"/>
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

export default AddModelModelNameForm;
