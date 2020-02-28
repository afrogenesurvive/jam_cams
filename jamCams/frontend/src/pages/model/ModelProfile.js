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

import ThisModelProfile from '../../components/Models/thisModelProfile';
// import UpdateUserFieldForm from '../components/Forms/UpdateUserFieldForm';

import './Users.css';

class ModelProfile extends Component {
  state = {
    model: null,
    models: [],
    updating: false,
    isLoading: false,
    modelUpdateField: null,
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
    // console.log("here there");
    if (this.context.model.name === "Lord-of-the-Manor"){
      this.setState({canDelete: true})
    }
    this.getThisModel();
  }

  startUpdateModelHandler = () => {
    this.setState({ updating: true });
  };

  modalConfirmUpdateHandler = (event) => {

    // const token = this.context.token;
    // let userId = this.context.userId;
    // let selectedUserId = this.context.selectedUser._id;
    // if(userId !== selectedUserId && this.context.user.role !== 'admin') {
    //   this.setState({userAlert: "Not the creator or Admin! No edit permission!!"});
    //   selectedUserId = null;
    // }
    // this.setState({ updating: false, userAlert: "Updating selected Staff ..." });
    // let email = event.target.formGridEmail.value;
    // let password = event.target.formGridPassword.value;
    // let name = event.target.formGridName.value;
    // let role = this.context.user.role;
    // let dob = event.target.formGridDob.value;
    //
    // // if (
    // //   event.target.staffCalendarDob.value !== null
    // // ) {
    // //   console.log("fancyDate2", new Date(event.target.staffCalendarDob.value).toISOString().slice(0,10));
    // //   dob = new Date(event.target.staffCalendarDob.value).toISOString().slice(0,10);
    // // }
    //
    // let phone = event.target.formGridPhone.value;
    // let addressNumber = event.target.formGridAddressNumber.value;
    // let addressStreet = event.target.formGridAddressStreet.value;
    // let addressTown = event.target.formGridAddressTown.value;
    //
    //
    //
    // if (email.trim().length === 0 ) {
    //   this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
    //   email = this.context.user.email;
    // }
    // if (password.trim().length === 0) {
    //   this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
    //   password = this.context.user.password;
    // }
    // if (name.trim().length === 0) {
    //   this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
    //   name = this.context.user.name;
    // }
    // // if (role.trim().length === 0) {
    // //   console.log("blank fields detected!!!...filling w/ previous data...");
    // //   role = this.state.user.role;
    // // }
    // if (dob.trim().length === 0) {
    //   this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
    //   dob = this.context.user.dob;
    // }
    // if (phone.trim().length === 0) {
    //   this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
    //   phone = this.context.user.phone;
    // }
    // if (addressNumber.trim().length === 0) {
    //   this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
    //   addressNumber = this.context.user.address.number;
    // }
    // if (addressStreet.trim().length === 0) {
    //   this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
    //   addressStreet = this.context.user.address.street;
    // }
    // if (addressTown.trim().length === 0) {
    //   this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
    //   addressTown = this.context.user.address.town;
    // }
    //
    // const requestBody = {
    //   query: `
    //     mutation {updateUser(userId:"${userId}",selectedUserId:"${userId}",userInput: {email:"${email}",password:"${password}",name:"${name}",dob:"${dob}",addressNumber:${addressNumber},addressStreet:"${addressStreet}",addressTown:"${addressTown}",addressParish:"${addressParish}", addressPostOffice:"${addressPostOffice}",phone:"${phone}",role:"${role}",employmentDate:"${employmentDate}",terminationDate:"${terminationDate}"})
    //     {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
    //     `};
    //
    // // fetch('http://ec2-3-19-32-237.us-east-2.compute.amazonaws.com/graphql', {
    // fetch('http://localhost:10000/graphql', {
    //   method: 'POST',
    //   body: JSON.stringify(requestBody),
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + token
    //   }})
    //   .then(res => {
    //     if (res.status !== 200 && res.status !== 201) {
    //       throw new Error('Failed!');
    //     }
    //     return res.json();
    //   })
    //   .then(resData => {
    //     const updatedUser = resData.data.updateUser;
    //     this.state.users.push(updatedUser);
    //     this.context.users = this.state.users;
    //     const responseAlert = JSON.stringify(resData.data).slice(2,25);
    //
    //     this.setState({ userAlert: responseAlert, user: updatedUser})
    //     this.getThisUser();
    //   })
    //   .catch(err => {
    //     this.setState({userAlert: err});
    //   });
    };

    modalConfirmUpdateFieldHandler = (event) => {

      // const token = this.context.token;
      // const userId = this.context.userId;
      // let selectedUserId = this.context.selectedUser._id;
      // if(userId !== selectedUserId && this.context.user.role !== 'admin') {
      //   this.setState({userAlert: "Not the creator or Admin! No edit permission!!"});
      //   selectedUserId = null;
      // }
      //
      // this.setState({ updating: false, userAlert: "Updating selected Staff by Field..." });
      //
      // let field = null;
      // let query = event.target.formGridQuery.value;
      // if (event.target.formGridFieldSelect.value === "select") {
      //   field = event.target.formGridField.value;
      // } else {
      //   field = event.target.formGridFieldSelect.value;
      // }
      //
      // const requestBody = {
      //   query:`
      //     mutation{updateUserField(userId:"${userId}",selectedUserId:"${userId}",field:"${field}",query:"${query}")
      //     {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
      //   `};
      //
      //
      // fetch('http://localhost:10000/graphql', {
      //   method: 'POST',
      //   body: JSON.stringify(requestBody),
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: 'Bearer ' + token
      //   }
      // })
      //   .then(res => {
      //     if (res.status !== 200 && res.status !== 201) {
      //       throw new Error('Failed!');
      //     }
      //     return res.json();
      //   })
      //   .then(resData => {
      //     const updatedUserId = resData.data.updateUserField._id;
      //     const updatedUser = this.state.users.find(e => e._id === updatedUserId);
      //     const updatedUserPos = this.state.users.indexOf(updatedUser);
      //     const slicedArray = this.state.users.splice(updatedUserPos, 1);
      //     this.state.users.push(resData.data.updateUserField);
      //     this.context.users = this.state.users;
      //
      //     const responseAlert = JSON.stringify(resData.data).slice(2,25);
      //     // console.log("responseAlert...", responseAlert);
      //     this.setState({ userAlert: responseAlert})
      //     this.getThisUser();
      //   })
      //   .catch(err => {
      //     this.setState({userAlert: err});
      //   });
    }


  getThisModel() {
    // console.log("here");
    this.setState({ isLoading: true });
    const activityId = this.context.activityId;
    const requestBody = {
      query: `
      query {getThisModel(activityId:"${activityId}")
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description},tokens,fans{_id,name,username},friends{_id,name},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time},transactions{_id,date,time}}}
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
        const thisModel = resData.data.getThisModel;
        this.context.model = thisModel;
        console.log("model:  ", JSON.stringify(thisModel));
        if (this.isActive) {
          this.setState({ model: thisModel, isLoading: false });
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
    this.setState({ updating: false  });
  };


  updateModelSpecialProfile (event) {

    const field = event.target.value;
    this.setState({ modelUpdateField: field});
  }



  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>


      <AlertBox
        authId={this.context.activityId}
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
          you={this.state.model}
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
              </Nav>
            </Col>
            <Col sm={10}>
              <Tab.Content>
                <Tab.Pane eventKey="Detail">
                  {this.state.model !== null && (
                      <ThisModelProfile
                        model={this.state.model}
                        authId={this.context.activityId}
                        canDelete={this.state.canDelete}
                      />
                    )}
                </Tab.Pane>

                <Tab.Pane eventKey="modelEditField">
                  {this.state.model !== null && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit a Single Field</Button>
                  )}
                  {this.state.updating &&
                    this.state.model !== null
                    && (
                      <p>lol</p>
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

export default ModelProfile;
