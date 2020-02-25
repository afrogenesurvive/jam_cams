import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AlertBox from '../components/AlertBox';
import CreateUserForm from '../components/Forms/CreateUserForm';
import LoadingOverlay from '../components/LoadingOverlay';

class SignupPage extends Component {
  state = {
    success: "Signup!!",
    userAlert: null,
    overlay: false,
    overlayStatus: "test",
  };

  modalConfirmHandler = (event) => {

    event.preventDefault();

    this.setState({ creating: false, userAlert: "Signing you up...." });
    const email = event.target.formGridEmail.value;
    const password = event.target.formGridPassword.value;
    const name = event.target.formGridName.value;
    const role = event.target.formGridRole.value;
    let dob = event.target.formGridDob.value;
    let phone = event.target.formGridPhone.value;
    let addressNumber = event.target.formGridAddressNumber.value;
    let addressStreet = event.target.formGridAddressStreet.value;
    let addressTown = event.target.formGridAddressTown.value;
    let addressParish = event.target.formGridAddressParish.value;
    let addressPostOffice = event.target.formGridAddressPostOffice.value;


    let employmentDate = event.target.formGridEmploymentDate.value;
    if (event.target.formGridEmploymentDateTodayCheckbox.checked === true) {
      employmentDate = new Date().toISOString().slice(0,10);
    }

    if (
      event.target.staffCalendarEmploymentDate.value !== null &&
      event.target.formGridEmploymentDateTodayCheckbox.checked !== true
    ) {
      console.log("fancyDate2", new Date(event.target.staffCalendarEmploymentDate.value).toISOString().slice(0,10));
      employmentDate = new Date(event.target.staffCalendarEmploymentDate.value).toISOString().slice(0,10);
    }


    let terminationDate = event.target.formGridTerminationDate.value;
    if (event.target.formGridTerminationDateTodayCheckbox.checked === true) {
      terminationDate = new Date().toISOString().slice(0,10);
    }

    if (
      event.target.staffCalendarTerminationDate.value !== null &&
      event.target.formGridTerminationDateTodayCheckbox.checked !== true
    ) {
      console.log("fancyDate2", new Date(event.target.staffCalendarTerminationDate.value).toISOString().slice(0,10));
      terminationDate = new Date(event.target.staffCalendarTerminationDate.value).toISOString().slice(0,10);
    }

    if (
      email.trim().length === 0 ||
      password.trim().length === 0 ||
      name.trim().length === 0 ||
      role.trim().length === 0 ||
      dob.trim().length === 0 ||
      phone.trim().length === 0 ||
      addressNumber.trim().length === 0 ||
      addressStreet.trim().length === 0 ||
      addressTown.trim().length === 0 ||
      addressParish.trim().length === 0 ||
      addressPostOffice.trim().length === 0 ||
      employmentDate.trim().length === 0 ||
      terminationDate.trim().length === 0
    ) {
      this.setState({userAlert: "blank fields detected!!!...Please try again..."});
      return;
    }

    const token = this.context.token;
    const userId = this.context.userId;
    const requestBody = {
      query: `
          mutation {
            createUser(userInput: {email:"${email}",password:"${password}",name:"${name}",role:"${role}",employmentDate:"${employmentDate}",terminationDate:"${terminationDate}"})
            {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}
          }`
        };

    // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        if (JSON.stringify(resData).slice(2,7) === 'error') {
          this.setState({success: "Something went wrong!!!", userAlert: "Something went wrong!!!"  });
        } else {
          this.setState({success: "Signup success...Proceed to login", userAlert: "Signup success...Proceed to login" });
        }
        this.context.selectedUser = resData.data.createUser;
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };

  render() {
    return (
      <React.Fragment>

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

      <Col className="signupRow" md={8}>
        <CreateUserForm
          canConfirm
          onConfirm={this.modalConfirmHandler}
          onSubmit={this.modalConfirmHandler}
          confirmText="Confirm"
          successText={this.state.success}
          title={"Sign-Up"}
        />
      </Col>
      </Row>

      </React.Fragment>
    );
  }
}

export default SignupPage;
