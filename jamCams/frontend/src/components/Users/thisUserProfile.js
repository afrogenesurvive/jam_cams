import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UserAttendanceList from './UserList/UserAttendanceList';
import UserLeaveList from './UserList/UserLeaveList';
import UserAttachmentList from './UserList/UserAttachmentList';

import './thisUserProfile.css';

const thisUserProfile = (props) => {
  const {...user} = props.user;
  const authUserId = props.authUserId;
  const userAddress = user.address;
  const userAttendance = user.attendance;
  const userLeave = user.leave;
  const userAttachment = user.attachments;
  const userDob = new Date(user.dob.substr(0,10)*1000).toISOString().slice(0,10);
  const userEmploymentDate = new Date(user.employmentDate.substr(0,10)*1000).toISOString().slice(0,10);
  let userTerminationDate = user.terminationDate;
  if (user.terminationDate !== null) {
    userTerminationDate = new Date(user.terminationDate.substr(0,10)*1000).toISOString().slice(0,10);
  }

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
            <span className="bold">ID:</span> {user._id}
          </Card.Text>
          <Card.Text>
            <span className="bold">Name:</span> {user.name}
          </Card.Text>
          <Card.Text>
            <span className="bold">D.O.B:</span> {userDob}
          </Card.Text>
          <Card.Text>
            <span className="bold">Phone:</span> {user.phone}
          </Card.Text>
          <Card.Text>
            <span className="bold">Email:</span> {user.email}
          </Card.Text>
          <Card.Text>
            <span className="bold">Role:</span> {user.role}
          </Card.Text>
        </Col>

        <Col className="detailCardCol">
          <Card.Text>
            <span className="bold">Start Date:</span> {userEmploymentDate}
          </Card.Text>
          <Card.Text>
            <span className="bold">End Date:</span> {userTerminationDate}
          </Card.Text>
          <Card.Text>
            <span className="bold">Address:</span>
          </Card.Text>
          <Card.Text>
            <span className="bold">Street & Number :</span> {userAddress.number}, {userAddress.street}
          </Card.Text>
          <Card.Text>
            <span className="bold">Town :</span> {userAddress.town}
          </Card.Text>
          <Card.Text>
            <span className="bold">Parish :</span> {userAddress.parish}
          </Card.Text>
          <Card.Text>
            <span className="bold">Post Office :</span> {userAddress.postOffice}
          </Card.Text>
        </Col>
      </Row>

      <Row className="detailCardRow">
        <Col className="detailCardCol">
        <Button variant="warning" onClick={props.onCreatePdf.bind(this, user)}>
          Create Pdf
        </Button>
        </Col>
      </Row>


    </Card.Body>
    </Card>
    </Tab>
    <Tab eventKey="Attendance" title="Attendance">
    <Card.Text>
      Attendance:
    </Card.Text>
    <UserAttendanceList
        userAttendance={userAttendance}
        authUserId={authUserId}
        canDelete={props.canDelete}
        onDelete={props.attendanceDelete}
      />
    </Tab>
    <Tab eventKey="Leave" title="Leave">
    <Card.Text>
      Leave:
    </Card.Text>
    <UserLeaveList
        userLeave={userLeave}
        authUserId={authUserId}
        canDelete={props.canDelete}
        onDelete={props.leaveDelete}
      />
    </Tab>
    <Tab eventKey="Attachments" title="Attachments">
    <Card.Text>
      Attachments:
    </Card.Text>
    <UserAttachmentList
        userAttachment={userAttachment}
        authUserId={authUserId}
        canDelete={props.canDelete}
        onDelete={props.attachmentDelete}
        onViewAttachment={props.onViewAttachment}
      />
    </Tab>
  </Tabs>
  );
}

export default thisUserProfile;
