import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

import './Auth.css';
import AuthContext from '../context/auth-context';
import AlertBox from '../components/AlertBox';
import LoadingOverlay from '../components/LoadingOverlay';

class AuthPage extends Component {
  state = {
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

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `};

    // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
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
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );

          const sessionStorageLoginInfo = {
            token: resData.data.login.token,
            userId: resData.data.login.userId,
            tokenExpiration: resData.data.login.tokenExpiration
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


      <Form className="auth-form" onSubmit={this.submitHandler}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
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
        <NavLink to="/signup">Signup</NavLink>
      </Button>
    </Form>

      </Row>


    );
  }
}

export default AuthPage;
