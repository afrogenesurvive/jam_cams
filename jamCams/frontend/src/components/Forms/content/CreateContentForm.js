import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import "react-datepicker/dist/react-datepicker.css";
import './CreateUserForm.css';

const CreateContentForm = (props) => {

  date
  type
  title
  fileName
  fileType
  fileSize
  filePath

return (
<div className="CreateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>

  <Form.Group as={Col} controlId="formGridTypeSelect">
  <Form.Label>Type</Form.Label>
  <Form.Control as="select">
    <option>type 1</option>
    <option>type 2</option>
    <option>type 3</option>
  </Form.Control>
  </Form.Group>
</Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="formGridTitle">
    <Form.Label>Title</Form.Label>
    <Form.Control type="text" placeholder="title"/>
  </Form.Group>

</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridFileName">
  <Form.Label>FileName</Form.Label>
  <Form.Control type="text" placeholder="FileName"/>
</Form.Group>
</Form.Row>

<Form.Row>
  <Form.Group as={Col} controlId="formGridFileSize">
    <Form.Label>FileSize</Form.Label>
    <Form.Control type="text" placeholder="FileSize"/>
  </Form.Group>
  <Form.Group as={Col} controlId="formGridFileType">
    <Form.Label>FileType</Form.Label>
    <Form.Control type="text" placeholder="FileType"/>
  </Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridFilePath">
  <Form.Label>FilePath</Form.Label>
  <Form.Control type="text" placeholder="FilePath"/>
</Form.Group>
</Form.Row>


<Form.Row>
{props.canCancel && (
  <Button variant="danger" className="formButton" onClick={props.onCancel}>Cancel</Button>
)}

{props.canConfirm && (
  <Button variant="primary" className="formButton" type="submit">
  Create
  </Button>
)}
<p>{props.successText}</p>
</Form.Row>


</Form>
</div>

)};

export default CreateContentForm;
