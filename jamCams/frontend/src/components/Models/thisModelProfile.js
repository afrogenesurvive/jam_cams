import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import UserAttendanceList from './UserList/UserAttendanceList';

import './thisUserProfile.css';

const thisModelProfile = (props) => {
  const {...model} = props.model;
  const authId = props.authId;
  const modelAddress = model.address;

  const modelDob = new Date(model.dob.substr(0,10)*1000).toISOString().slice(0,10);

  return (

  <Tabs defaultActiveKey="Demographics" id="uncontrolled-tab-example">
    <Tab eventKey="" title="Details:" disabled>
    </Tab>
    <Tab eventKey="Demographics" title="Demographics">
    <Card className="UserDetailCard">
    <Card.Body>
      <Card.Title><span className="ul">Your Profile Details</span></Card.Title>
      <Row className="detailCardRow">
        <Col className="detailCardCol">
          <Card.Text>
            <span className="bold">ID:</span> {model._id}
          </Card.Text>
          <Card.Text>
            <span className="bold">Name:</span> {model.name}
          </Card.Text>
          <Card.Text>
            <span className="bold">Username:</span> {model.username}
          </Card.Text>
          <Card.Text>
            <span className="bold">D.O.B:</span> {modelDob}
          </Card.Text>
          <Card.Text>
            <span className="bold">Phone:</span> {model.contact.phone}
          </Card.Text>
          <Card.Text>
            <span className="bold">Email:</span> {model.contact.email}
          </Card.Text>
        </Col>

        <Col className="detailCardCol">
          <Card.Text>
            <span className="bold">Bio:</span> {model.bio}
          </Card.Text>
          <Card.Text>
            <span className="bold">Address:</span>
          </Card.Text>
          <Card.Text>
            <span className="bold">Street & Number :</span> {modelAddress.number}, {modelAddress.street}
          </Card.Text>
          <Card.Text>
            <span className="bold">Town :</span> {modelAddress.town}
          </Card.Text>
          <Card.Text>
            <span className="bold">City :</span> {modelAddress.city}
          </Card.Text>
          <Card.Text>
            <span className="bold">Country :</span> {modelAddress.country}
          </Card.Text>
          <Card.Text>
            <span className="bold">Postal Code :</span> {modelAddress.postalCode}
          </Card.Text>
        </Col>
      </Row>

    </Card.Body>
    </Card>
    </Tab>

  </Tabs>
  );
}

export default thisModelProfile;
