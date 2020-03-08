import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import AuthContext from '../context/auth-context';
import LoadingOverlay from '../components/LoadingOverlay';
import AlertBox from '../components/AlertBox';

import './Sidebar.css';

class SidebarPage extends Component {
  state = {
    authContext: AuthContext._currentValue,
    overlay: false,
    overlayStatus: "test",
  };
  isActive = true;

  static contextType = AuthContext;

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
      <Container className="sidebarContainer">
      <Row className="sidebarRow1">
      <Col md={12} className="">

      <Card border="primary" className="sidebarCard">
      <Card.Body>
        <Card.Title className="cardTitle">You</Card.Title>
        <Card.Subtitle className="mb-2">ID:</Card.Subtitle>

        <Card.Text>
          {this.context.user._id}
        </Card.Text>
        <Card.Subtitle className="mb-2">Name:</Card.Subtitle>
        <Card.Text>
          {this.context.user.name}
        </Card.Text>
        <Card.Subtitle className="mb-2">Role:</Card.Subtitle>
        <Card.Text>
          {this.context.user.role}
        </Card.Text>
      </Card.Body>
      </Card>

      <Card border="secondary" className="sidebarCard">
      <Card.Body>
        <Card.Title className="cardTitle">Selection</Card.Title>
        <Card.Subtitle className="mb-2">Staff:</Card.Subtitle>
        <Card.Text>
          {this.context.selectedUser._id}
        </Card.Text>
        <Card.Text>
          {this.context.selectedUser.name}
        </Card.Text>

      </Card.Body>
      </Card>
      <AlertBox
        authId={this.context.activityId}
        alert={this.context.userAlert}
      />
      </Col>
      </Row>
      {
        // <AlertBox
        //   authId={props.authId}
        //   alert={props.alert}
        // />
      }
      </Container>
      </React.Fragment>
    );
  }
}

export default SidebarPage;
