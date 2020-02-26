import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';

import './Auth.css';
import AuthContext from '../../context/auth-context';
import AlertBox from '../../components/AlertBox';
import LoadingOverlay from '../../components/LoadingOverlay';

class AuthPage extends Component {
  state = {
    role: null,
    userAlert: null,
    overlay: false,
    overlayStatus: "test",
  };
  static contextType = AuthContext;

  componentDidMount() {

    if (sessionStorage.getItem('login info')) {
      this.setState({ userAlert: "sesh cookie present" });
    } else {
      this.setState({ userAlert: "Alerts shown here" });
    }
  }

  submitHandler = event => {
    event.preventDefault();

    this.setState({ userAlert: "Signing you in..."})


    const email = event.target.formBasicEmail.value;
    const password = event.target.formBasicPassword.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = null;
    if (this.state.role === "User") {
      requestBody = {
        query: `
          query {userLogin(email:"${email}",password:"${password}")
          {activityId,role,token,tokenExpiration}}
        `};
    }
    if (this.state.role === "Model") {
      requestBody = {
        query: `
          query {modelLogin(email:"${email}",password:"${password}")
          {activityId,role,token,tokenExpiration}}
        `};
    }

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          // this.context.userAlert = 'Failed!';
          throw new Error('Failed!');
        }
        // this.context.userAlert = 'Failed!';
        return res.json();
      })
      .then(resData => {
        const responseAlert = JSON.stringify(resData.data).slice(2,25)
        this.setState({userAlert: responseAlert})
        let sessionStorageLoginInfo = null;

        if (resData.data.userLogin.token) {
          this.context.login(
            resData.data.userLogin.token,
            resData.data.userLogin.activityId,
            resData.data.userLogin.role,
            resData.data.userLogin.tokenExpiration
          );

          sessionStorageLoginInfo = {
           token: resData.data.userLogin.token,
           activityId: resData.data.userLogin.activityId,
           role: resData.data.userLogin.role,
           tokenExpiration: resData.data.userLogin.tokenExpiration
         };
         // sessionStorage.setItem('login info', sessionStorageLoginInfo);
         sessionStorage.setItem('login info', JSON.stringify(sessionStorageLoginInfo));

        }

        if (resData.data.modelLogin.token) {
          this.context.login(
            resData.data.modelLogin.token,
            resData.data.modelLogin.activityId,
            resData.data.modelLogin.role,
            resData.data.modelLogin.tokenExpiration
          );

           sessionStorageLoginInfo = {
            token: resData.data.modelLogin.token,
            activityId: resData.data.modelLogin.activityId,
            role: resData.data.modelLogin.role,
            tokenExpiration: resData.data.modelLogin.tokenExpiration
          };
          // sessionStorage.setItem('login info', sessionStorageLoginInfo);
          sessionStorage.setItem('login info', JSON.stringify(sessionStorageLoginInfo));
        }
      })
      .catch(err => {
        this.setState({userAlert: err});
        // this.context.userAlert = err;
        // console.log(`
        //   err: ${this.context.userAlert}
        //   `);
      });
  };

  changeLoginMode = (args) => {
    console.log("login mode change", args);
  }

  render() {
    return (
      <Row>
      <AlertBox
        authUserId={this.context.userId}
        alert={this.state.userAlert}
      />

      {this.state.overlay === true && (
        <LoadingOverlay
          status={this.state.overlayStatus}
        />
      )}


      <Tab.Container id="left-tabs-example" defaultActiveKey="first">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="1">
                <Button variant="primary" onClick={this.changeLoginMode.bind(this, "User")}>Users</Button>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2">
                <Button variant="primary" onClick={this.changeLoginMode.bind(this, "Model")}>Users</Button>
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          <Col sm={9}>
            <Tab.Content>
              <Tab.Pane eventKey="1">
                <Form className="auth-form" onSubmit={this.submitHandler}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"/>
                    <Form.Text className="text-muted">
                      User Login
                    </Form.Text>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Button variant="outline-success" type="submit" className="loginButton" size="lg">
                    Login
                  </Button>

                  <Button variant="outline-warning" className="loginButton" size="lg">
                    <NavLink to="/signup">Signup as User</NavLink>
                  </Button>
                </Form>
              </Tab.Pane>
              <Tab.Pane eventKey="2">

              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      </Row>


    );
  }
}

export default AuthPage;
