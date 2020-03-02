import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './CreateUserForm.css';

const UpdateModelForm = (props) => {

  const [dob, setDob] = useState(new Date());

  const handleChangeDob = date => {
    setDob(date);
    console.log(`Dob ${dob}`);
   }

const {...model} = props.model;

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder={model.contact.email}/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder={model.password}/>
  </Form.Group>
</Form.Row>

<Form.Row>

<Form.Group as={Col} controlId="formGridName">
  <Form.Label>Name</Form.Label>
  <Form.Control type="text" placeholder={model.name}/>
</Form.Group>
{
  // <Form.Group as={Col} controlId="formGridRole">
  //   <Form.Label>Role</Form.Label>
  //   <Form.Control type="text" placeholder={user.role}/>
  // </Form.Group>
}
<Form.Group as={Col} controlId="formGridUsername">
  <Form.Label>Username</Form.Label>
  <Form.Control type="text" placeholder="Name" />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridPhone">
  <Form.Label>Phone</Form.Label>
  <Form.Control type="number" placeholder={model.contact.phone}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDob">
  <Form.Label>D.O.B: {model.dob}</Form.Label>
  <Form.Control type="date" placeholder={model.dob}/>
</Form.Group>

</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressNumber">
  <Form.Label>Street No.</Form.Label>
  <Form.Control type="number" placeholder={model.address.number}/>
</Form.Group>

<Form.Group as={Col} controlId="formGridAddressStreet">
  <Form.Label>Street Name</Form.Label>
  <Form.Control type="text" placeholder={model.address.street}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressTown">
  <Form.Label>Town</Form.Label>
  <Form.Control type="text" placeholder={model.address.town}/>
</Form.Group>

<Form.Group as={Col} controlId="formGridAddressCity">
  <Form.Label>City</Form.Label>
  <Form.Control type="text" placeholder={model.address.city}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressCountry">
  <Form.Label>Country</Form.Label>
  <Form.Control type="text" placeholder={model.address.country}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddresspostalCode">
  <Form.Label>postalCode</Form.Label>
  <Form.Control type="text" placeholder={model.address.postalCode}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridBio">
  <Form.Label>Bio</Form.Label>
  <Form.Control as="textarea"rows="7" placeholder={model.bio}/>
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

export default UpdateModelForm;
