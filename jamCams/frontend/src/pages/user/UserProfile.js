// import S3 from 'react-aws-s3';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';

import AuthContext from '../../context/auth-context';
import AlertBox from '../../components/AlertBox';
import AttachmentViewer from '../../components/AttachmentViewer';
import LoadingOverlay from '../../components/LoadingOverlay';
import SidebarPage from '../Sidebar';
import SidebarControl from '../../components/SidebarControl';

import ThisUserProfile from '../../components/Users/thisUserProfile';
import UpdateUserForm from '../../components/Forms/user/UpdateUserForm';
import UpdateUserFieldForm from '../../components/Forms/user/UpdateUserFieldForm';

import './Users.css';

class UserProfile extends Component {
  state = {
    user: null,
    users: [],
    updating: false,
    updatingField: false,
    isLoading: false,
    userUpdateField: null,
    userAlert: null,
    overlay: false,
    overlayStatus: "test",
    canDelete: null,
    showAttachment: false,
    showThisAttachmentFile: null,
    showThisAttachmentType: null,
    sidebarShow: true,
    mCol1Size: 3,
    mCol2Size: 9,
  };
  isActive = true;

  static contextType = AuthContext;

  componentDidMount() {
    if (this.context.user.name === "Lord-of-the-Manor"){
      this.setState({canDelete: true})
    }
    this.getThisUser();
  }

  startUpdateUserHandler = () => {
    this.setState({ updating: true });
  };
  startUpdateUserFieldHandler = () => {
    this.setState({ updatingField: true });
  };

  modalConfirmUpdateHandler = (event) => {

    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ updating: false, userAlert: "Updating selected Staff ..." });
    let contactEmail = event.target.formGridEmail.value;
    let password = event.target.formGridPassword.value;
    let name = event.target.formGridName.value;
    let username = event.target.formGridUserame.value;
    let role = this.context.user.role;
    let dob = event.target.formGridDob.value;

    let contactPhone = event.target.formGridPhone.value;
    let addressNumber = event.target.formGridAddressNumber.value;
    let addressStreet = event.target.formGridAddressStreet.value;
    let addressTown = event.target.formGridAddressTown.value;
    let addressCity = event.target.formGridAddressCity.value;
    let addressCountry = event.target.formGridAddressCountry.value;
    let addressPostalCode = event.target.formGridAddressPostalCode.value;
    let bio = event.target.formGridBio.value;



    if (contactEmail.trim().length === 0 ) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      contactEmail = this.context.user.contact.email;
    }
    if (password.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      password = this.context.user.password;
    }
    if (name.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      name = this.context.user.name;
    }
    if (username.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      username = this.context.user.username;
    }
    // if (role.trim().length === 0) {
    //   console.log("blank fields detected!!!...filling w/ previous data...");
    //   role = this.state.user.role;
    // }
    if (dob.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      dob = this.context.user.dob;
    }
    if (contactPhone.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      contactPhone = this.context.user.contact.phone;
    }
    if (addressNumber.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressNumber = this.context.user.address.number;
    }
    if (addressStreet.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressStreet = this.context.user.address.street;
    }
    if (addressTown.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressTown = this.context.user.address.town;
    }
    if (addressCity.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressCity = this.context.user.address.city;
    }
    if (addressCountry.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressCountry = this.context.user.address.country;
    }
    if (addressPostalCode.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressPostalCode = this.context.user.address.postalCode;
    }
    if (bio.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      bio = this.context.user.bio;
    }

    const requestBody = {
      query: `
          query": "mutation {updateUser(activityId:"${activityId}", userId:"${activityId}",
          userInput:{
            password:"${password}",
            name:"${name}",
            username:"${username}",
            dob:"${dob}",
            addressNumber:${addressNumber},
            addressStreet:"${addressStreet}",
            addressTown:"${addressTown}",
            addressCity:"${addressCity}",
            addressCountry:"${addressCountry}",
            addressPostalCode:"${addressPostalCode}",
            contactPhone:"${contactPhone}",
            contactEmail:"${contactEmail}",
            bio:"${bio}"})
          {_id,name,role,dob,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{date,ref{_id}},viewedContent{date,ref{_id}},likedContent{date,ref{_id}},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
        `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const updatedUser = resData.data.updateUser;
        this.context.user = updatedUser;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);

        this.setState({ userAlert: responseAlert, user: updatedUser})
        this.getThisUser();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
    };

    modalConfirmUpdateFieldHandler = (event) => {

      const token = this.context.token;
      const activityId = this.context.activityId;

      this.setState({ updatingField: false, userAlert: "Updating selected Staff by Field..." });

      let field = null;
      let query = event.target.formGridQuery.value;
      if (event.target.formGridFieldSelect.value === "select") {
        field = event.target.formGridField.value;
      } else {
        field = event.target.formGridFieldSelect.value;
      }

      const requestBody = {
        query:`
          mutation {updateUserField(activityId:"${activityId}", userId:"${activityId}",field:"${field}", query:"${query}")
          {_id,name,role,dob,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{date,ref{_id}},viewedContent{date,ref{_id}},likedContent{date,ref{_id}},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
        `};

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
          const updatedUser = resData.data.updateUserField
          this.context.user = resData.data.updateUserField;

          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, user: resData.data.updateUserField})
          this.getThisUser();
        })
        .catch(err => {
          this.setState({userAlert: err});
        });
    }


  getThisUser() {
    this.setState({ isLoading: true });
    const activityId = this.context.activityId;
    const requestBody = {
      query: `
      query {getThisUser(activityId:"${activityId}")
      {_id,name,role,username,dob,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
        `};

    fetch('http://localhost:9009/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }})
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const thisUser = resData.data.getThisUser;
        this.context.user = thisUser;
        if (this.isActive) {
          this.setState({ user: thisUser, isLoading: false });
        }
      })
      .catch(err => {
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }


  modalCancelHandler = () => {
    this.setState({ updating: false, updatingField: false  });
  };


  updateUserSpecialProfile (event) {

    const field = event.target.value;
    this.setState({ userUpdateField: field});
  }

  showSidebar = () => {
    console.log(`
      showing sidebar...
      `);
      this.setState({
        sidebarShow: true,
        mCol2Size: 9
      })
  }

  hideSidebar = () => {
    console.log(`
      hiding sidebar...
      `);
      this.setState({
        sidebarShow: false,
        mCol2Size: 11
      })
  }


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>


      <AlertBox
        authUserId={this.context.userId}
        alert={this.state.userAlert}
      />

      {this.state.overlay === true && (
        <LoadingOverlay
          status={this.state.overlayStatus}
        />
      )}
      <SidebarControl
        onShowSidebar={this.showSidebar}
        onHideSidebar={this.hideSidebar}
      />

      <Row>

      {this.state.sidebarShow === true && (
        <Col md={3} className="MasterCol1">
        <SidebarPage
          you={this.state.user}
        />
        </Col>
      )}

      <Col md={this.state.mCol2Size} className="MasterCol2">
        <Container className="containerProfile">

        <Tab.Container id="left-tabs-example" defaultActiveKey="Detail">
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="Detail">You</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>...</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="Detail">
                  {this.state.user !== null && (
                      <ThisUserProfile
                        user={this.state.user}
                        authId={this.context.activityId}
                        canDelete={this.state.canDelete}
                      />
                    )}

                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit Demographics</Button>
                    {this.state.updating === true &&
                      this.state.user !== null && (
                      <UpdateUserForm
                      canCancelProfile
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.modalConfirmUpdateHandler}
                        confirmText="Confirm"
                        user={this.state.user}
                        authId={this.context.activityId}
                      />
                    )}

                    {this.state.user !== null && (
                      <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserFieldHandler}>Edit a Single Field</Button>
                    )}
                    {this.state.updatingField &&
                      this.state.user !== null
                      && (
                        <UpdateUserFieldForm
                          authId={this.context.activityId}
                          canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.modalConfirmUpdateFieldHandler}
                          confirmText="Confirm"
                          user={this.state.user}
                        />
                    )}
                </Tab.Pane>

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        </Container>
      </Col>
      </Row>
      </React.Fragment>
    );
  }
}

export default UserProfile;
