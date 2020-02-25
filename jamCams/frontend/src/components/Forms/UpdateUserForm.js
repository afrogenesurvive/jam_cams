import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import './CreateUserForm.css';

const UpdateUserForm = (props) => {

  const [dob, setDob] = useState(new Date());
  const [employmentDate, setEmploymentDate] = useState(new Date());
  const [terminationDate, setTerminationDate] = useState(new Date());

  const handleChangeDob = date => {
    setDob(date);
    console.log(`Dob ${dob}`);
   }
  const handleChangeEmploymentDate = date => {
    setEmploymentDate(date);
    console.log(`employmentDate ${employmentDate}`);
   }
  const handleChangeTerminationDate = date => {
    setTerminationDate(date);
    console.log(`terminationDate ${terminationDate}`);
   }

const {...user} = props.user;

return (
<div className="UpdateFormContainer">
<Form onSubmit={props.onConfirm}>
<Form.Row>
  <Form.Group as={Col} controlId="formGridEmail">
    <Form.Label>Email</Form.Label>
    <Form.Control type="email" placeholder={user.email}/>
  </Form.Group>

  <Form.Group as={Col} controlId="formGridPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder={user.password}/>
  </Form.Group>
</Form.Row>

<Form.Row>

<Form.Group as={Col} controlId="formGridName">
  <Form.Label>Name</Form.Label>
  <Form.Control type="text" placeholder={user.name}/>
</Form.Group>
{
  // <Form.Group as={Col} controlId="formGridRole">
  //   <Form.Label>Role</Form.Label>
  //   <Form.Control type="text" placeholder={user.role}/>
  // </Form.Group>
}
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridPhone">
  <Form.Label>Phone</Form.Label>
  <Form.Control type="number" placeholder={user.phone}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridDob">
  <Form.Label>D.O.B</Form.Label>
  <Form.Control type="date" placeholder={user.dob}/>
</Form.Group>

</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="">
  <Form.Label>Fancy D.O.B</Form.Label>
  <DatePicker className="" id="staffCalendarDob"
    selected={dob}
    onChange={handleChangeDob}
  />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridEmploymentDateTodayCheckbox">
  <Form.Label>Today ?</Form.Label>
  <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="">
  <Form.Label>Fancy Employment Date</Form.Label>
  <DatePicker className="" id="staffCalendarEmploymentDate"
    selected={employmentDate}
    onChange={handleChangeEmploymentDate}
  />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridTerminationDateTodayCheckbox">
  <Form.Label>Today ?</Form.Label>
  <Form.Control type="checkbox" onChange={(e) => {console.log(e.target.checked)}}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="">
  <Form.Label>Fancy Termination Date</Form.Label>
  <DatePicker className="" id="staffCalendarTerminationDate"
    selected={terminationDate}
    onChange={handleChangeTerminationDate}
  />
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressNumber">
  <Form.Label>Street No.</Form.Label>
  <Form.Control type="number" placeholder={user.address.number}/>
</Form.Group>

<Form.Group as={Col} controlId="formGridAddressStreet">
  <Form.Label>Street Name</Form.Label>
  <Form.Control type="text" placeholder={user.address.street}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressTown">
  <Form.Label>Town</Form.Label>
  <Form.Control type="text" placeholder={user.address.town}/>
</Form.Group>
</Form.Row>

<Form.Row>
<Form.Group as={Col} controlId="formGridAddressParish">
  <Form.Label>Parish</Form.Label>
  <Form.Control type="text" placeholder={user.address.parish}/>
</Form.Group>
<Form.Group as={Col} controlId="formGridAddressPostOffice">
  <Form.Label>Post Office</Form.Label>
  <Form.Control type="text" placeholder={user.address.postOffice}/>
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

export default UpdateUserForm;
