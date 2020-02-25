import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './CreateUserForm.css';

const SearchUserForm = (props) => {

return (
<div className="SearchFormContainer">
  <Form onSubmit={props.onConfirm}>
<Form.Group controlId="formBasicFieldSelect">
<Form.Label>Field</Form.Label>
<Form.Control as="select">
<option>select</option>
<option>email</option>
<option>password</option>
<option>name</option>
<option>dob</option>
<option>phone</option>
<option>address.town</option>
<option>address.parish</option>
<option>role</option>
<option>employmentDate</option>
<option>terminationDate</option>
</Form.Control>
<Form.Text className="text-muted">
</Form.Text>
</Form.Group>

<Form.Group controlId="formBasicField">
<Form.Label>Field</Form.Label>
<Form.Control type="textarea" rows="5" placeholder="Field"/>
</Form.Group>

<Form.Group controlId="formBasicQuery">
<Form.Label>Query</Form.Label>
<Form.Control type="textarea" rows="5" placeholder="Query"/>
</Form.Group>

{props.canCancel && (
  <Button variant="danger" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="primary" type="submit">
  Submit
  </Button>
)}

</Form>
</div>


)};

export default SearchUserForm;
