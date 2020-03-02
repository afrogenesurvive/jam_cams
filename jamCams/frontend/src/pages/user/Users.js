import S3 from 'react-aws-s3';
import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Card from 'react-bootstrap/Card';

import AuthContext from '../../context/auth-context';
import UserList from '../../components/Users/UserList/UserList';
import SearchUserList from '../../components/Users/UserList/SearchUserList';
import UserDetail from '../../components/Users/UserDetail';

import Spinner from '../../components/Spinner/Spinner';
import SidebarPage from './Sidebar';
import SidebarControl from '../../components/SidebarControl';
import AlertBox from '../../components/AlertBox';
import LoadingOverlay from '../../components/LoadingOverlay';
import AttachmentViewer from '../../components/AttachmentViewer';
//
// import CreateUserForm from '../components/Forms/CreateUserForm';
// import UpdateUserForm from '../components/Forms/UpdateUserForm';
// import UpdateUserFieldForm from '../components/Forms/UpdateUserFieldForm';
// import UpdateUserAttendanceForm from '../components/Forms/UpdateUserAttendanceForm';
// import UpdateUserAttachmentForm from '../components/Forms/UpdateUserAttachmentForm';
// import UpdateUserLeaveForm from '../components/Forms/UpdateUserLeaveForm';
// import SearchUserForm from '../components/Forms/SearchUserForm';
// import SearchUserIdForm from '../components/Forms/SearchUserIdForm';
// import SearchUserNameForm from '../components/Forms/SearchUserNameForm';
// import SearchUserAttendanceDateForm from '../components/Forms/SearchUserAttendanceDateForm';
// import SearchUserLeaveDateRangeForm from '../components/Forms/SearchUserLeaveDateRangeForm';

import './Users.css';

class UsersPage extends Component {
  state = {
    creating: false,
    updating: false,
    deleting: false,
    searching: false,
    users: [],
    searchUsers: [],
    isLoading: false,
    isSorting: false,
    selectedUser: null,
    userUpdateField: null,
    userSearchField: null,
    userSearchQuery: null,
    canDelete: null,
    userAlert: null,
    overlay: false,
    overlayStatus: "test",
    file: null,
    showAttachment: false,
    showThisAttachmentFile: null,
    showThisAttachmentType: null,
    creatingDocument: false,
    createPdf: false,
    pdfData: null,
    pdfType: null,sidebarShow: true,
    mCol1Size: 3,
    mCol2Size: 9,
    creds: null
  };
  isActive = true;

  static contextType = AuthContext;

  componentDidMount() {

    if (this.context.user.name === "Lord-of-the-Manor"){
      this.setState({canDelete: true})
    }

    if (JSON.stringify(this.context.selectedUser) !== "{}") {
      this.setState({ selectedUser: this.context.selectedUser })
    }

    this.fetchUsers();
    this.getCreds();
  }

  startCreateUserHandler = () => {
    this.setState({ creating: true });
  };
  startUpdateUserHandler = () => {
    this.setState({ updating: true });
  };
  startSearchUserHandler = () => {
    this.setState({ searching: true });
  };

  modalConfirmHandler = (event) => {

    this.setState({ creating: false, userAlert: "Creating new user..." });

    const email = event.target.formGridEmail.value;
    const password = event.target.formGridPassword.value;
    const name = event.target.formGridName.value;
    const role = event.target.formGridRole.value;
    const dob = event.target.formGridDob.value;
    const phone = event.target.formGridPhone.value;
    const addressNumber = event.target.formGridAddressNumber.value;
    const addressStreet = event.target.formGridAddressStreet.value;
    const addressTown = event.target.formGridAddressTown.value;
    const addressParish = event.target.formGridAddressParish.value;
    const addressPostOffice = event.target.formGridAddressPostOffice.value;

    let employmentDate = new Date(event.target.staffCalendarEmploymentDate.value).toISOString().slice(0,10);
    if (event.target.formGridEmploymentDateTodayCheckbox.checked === true) {
      employmentDate = new Date().toISOString().slice(0,10);
    }


    let terminationDate = new Date(event.target.staffCalendarTerminationDate.value).toISOString().slice(0,10);
    if (event.target.formGridTerminationDateTodayCheckbox.checked === true) {
      terminationDate = new Date().toISOString().slice(0,10);
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
      employmentDate.trim().length === 0
    ) {
      this.setState({userAlert: "blank fields detected!!!...Please try again..."});
      return;
    }

    const token = this.context.token;
    const userId = this.context.userId;
    const requestBody = {
      query: `
          mutation {createUser(userInput: {email:"${email}",password:"${password}",name:"${name}",dob:"${dob}",addressNumber:${addressNumber},addressStreet:"${addressStreet}",addressTown:"${addressTown}",addressParish:"${addressParish}", addressPostOffice:"${addressPostOffice}",phone:"${phone}",role:"${role}",employmentDate:"${employmentDate}",terminationDate:"${terminationDate}"})
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
        this.setState(prevState => {
          const updatedUsers = [...prevState.users];
          updatedUsers.push(resData.data.createUser);
          return { users: updatedUsers };
        });
        this.context.users.push(resData.data.createUser);
        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert, selectedUser: resData.data.createUser});
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };

  modalConfirmSearchHandler = (event) => {

    let userId = this.context.userId;
    const token = this.context.token;
    let field = null;
    let query = event.target.formBasicQuery.value;
    if (event.target.formBasicFieldSelect.value === "select") {
      field = event.target.formBasicField.value;
    } else {
      field = event.target.formBasicFieldSelect.value;
    }

    this.setState({
      userSearchField: field,
      userSearchQuery: query,
      searching: false,
      userAlert: "Searching for User..."
    })

    if (
      field.trim().length === 0 ||
      query.trim().length === 0
    ) {
      this.setState({userAlert: "blank fields detected!!!...Please try again..."})
      return;
    }

    const search = { field, query };
    const requestBody = {
      query: `
        query {getUserField(userId:"${userId}",field:"${field}",query:"${query}")
        {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
      `}

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
        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        const searchUsers = resData.data.getUserField;
        this.setState({ searchUsers: searchUsers, userAlert: responseAlert})
        // this.fetchUsers();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }

  modalConfirmSearchIdHandler = (event) => {

    let userId = this.context.userId;
    const token = this.context.token;
    this.setState({ searching: false, userAlert: "Searching for Staff by Id #..." });
    let selectedUserId = event.target.formBasicId.value;
    const requestBody = {
      query: `
        query {getUserId(userId:"${userId}",selectedUserId:"${selectedUserId}")
        {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
      `}

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
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        const searchUsers = resData.data.getUserId;

        this.setState({ searchUsers: [searchUsers], userAlert: responseAlert });
        // this.fetchUsers();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }



  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, deleting: false, searching: false});
  };

  fetchUsers() {

    const userId = this.context.userId;
    this.setState({ isLoading: true, userAlert: "Fetching Staff Master List..." });
    const requestBody = {
      query: `
          query {users (userId:"${userId}")
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          this.context.userAlert = 'Failed!';
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert, users: resData.data.users, isLoading: false});
        this.context.users = this.state.users;
      })
      .catch(err => {
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  fetchUsersAsc = () => {

    this.setState({ userAlert: "Fetching Staff Master List in Ascending order..."})
    const userId = this.context.userId;
    const requestBody = {
      query: `
          query {usersNameAsc (userId:"${userId}")
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          this.context.userAlert = 'Failed!';
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const users = resData.data.usersNameAsc;
        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert, users: users});
        this.context.users = this.state.users;
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }
  fetchUsersDesc = () => {

    this.setState({ userAlert: "Fetching Staff Master List in Descending order ..."})
    const userId = this.context.userId;
    const requestBody = {
      query: `
          query {usersNameDesc (userId:"${userId}")
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
        `};

    fetch('http://localhost:10000/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          this.context.userAlert = 'Failed!';
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        const users = resData.data.usersNameDesc;
        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert, users: users});
        this.context.users = this.state.users;
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }

modalDeleteHandler = () => {

  const userId = this.context.userId;
  const selectedUserId = this.context.selectedUser._id;
  if(this.context.user.role !== 'admin') {
    this.setState({userAlert: "Not the Admin! No edit permission!!"})
  }

  this.setState({deleting: true, userAlert: "deleting user.."});

  const requestBody = {
    query: `
        mutation {
          deleteUser(userId: "${userId}", selectedUserId: "${selectedUserId}")
          {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}
        }`
      };

  fetch('http://localhost:10000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.context.token
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const responseAlert = JSON.stringify(resData.data).slice(0,8);
      this.setState({userAlert: responseAlert});
      let deletedUser = resData.data.deleteUser;
      let deletedUserId = deletedUser._id;
      deletedUser = this.state.users.find(e => e._id === deletedUserId);
      const deletedUserPos = this.state.users.indexOf(deletedUser);
      const slicedArray = this.state.users.splice(deletedUserPos, 1);
      this.setState({ deleting: false });
      this.fetchUsers();
    })
    .catch(err => {
      this.setState({userAlert: err});
      if (this.isActive) {
        this.setState({ deleting: false });
      }
    });
}

deleteUserAttendanceItem = (props) => {

  this.setState({ userAlert: "Deleting Staff Attendance Item..."})
  let token = this.context.token;
  let userId = this.context.userId;
  let selectedUserId = this.state.selectedUser._id;
  let date = new Date(props.date.substr(0,10)*1000).toISOString().slice(0,10);
  const requestBody = {
    query: `
     mutation{deleteUserAttendance(userId:"${userId}",selectedUserId:"${selectedUserId}",attendanceDate:"${date}")
     {_id,email,password,name,dob,address{number,street,town,parish,postOffice},phone,role,employmentDate,terminationDate,attachments{name,format,path},attendance{date,status,description},leave{type,title,startDate,endDate}}}
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
        const updatedUserId = resData.data.deleteUserAttendance._id;
        const updatedUser = this.state.users.find(e => e._id === updatedUserId);
        const updatedUserPos = this.state.users.indexOf(updatedUser);
        const slicedArray = this.state.users.splice(updatedUserPos, 1);
        this.state.users.push(resData.data.deleteUserAttendance);
        this.context.users = this.state.users;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert})
        this.fetchUsers();
      })
      .catch(err => {
        this.setState({ userAlert: err })
      });
}


showDetailHandler = userId => {

  this.setState(prevState => {
    const selectedUser = prevState.users.find(e => e._id === userId);
    this.context.selectedUser = selectedUser;
    this.setState({selectedUser: selectedUser});
    return { selectedUser: selectedUser };
  });
};

  onViewAttachment = (attachment) => {

      this.setState({showAttachment: true})

      const file = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+attachment.path+"/"+attachment.name;
      const type = attachment.format;

      this.setState({showThisAttachmentFile: file, showThisAttachmentType: type, })
  }

  closeAttachmentView = () => {

      this.setState({showAttachment: false})
  }

  userSearchClearlHandler () {
    this.setState({searchUsers: [], userAlert: "clearing user search results"});
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
      {this.state.showAttachment === true && (
        <AttachmentViewer
          onCloseAttachmentView={this.closeAttachmentView}
          attachmentFile={this.state.showThisAttachmentFile}
          attachmentType={this.state.showThisAttachmentType}
        />
      )}
      <AlertBox
        authUserId={this.context.userId}
        alert={this.state.userAlert}
      />
      <SidebarControl
        onShowSidebar={this.showSidebar}
        onHideSidebar={this.hideSidebar}
      />
      {this.state.overlay === true && (
        <LoadingOverlay
          status={this.state.overlayStatus}
        />
      )}

      <Accordion>

        <Row>

        {this.state.sidebarShow === true && (
          <Col md={3} className="MasterCol1">
          <SidebarPage
            you={this.state.selectedUser}
          />
          </Col>
        )}

        <Col md={this.state.mCol2Size} className="MasterCol2">
            <Container className="containerCombinedDetail">
              <Tab.Container id="left-tabs-example" defaultActiveKey="userDetail">
                <Row>
                  <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="MasterList">MASTER LIST</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>Search:</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="SearchInput">Input</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="SearchResult">Results</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="userDetail">Selected</Nav.Link>
                      </Nav.Item>
                      { this.context.user.role === "admin" && (
                      <Nav.Item>
                        <Nav.Link eventKey="userCreate">Create New</Nav.Link>
                      </Nav.Item>
                      )}
                      <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>Edit:</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="userEditDemographics">Demographics</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="userEditField">Single Field</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="disabled" disabled>Add:</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="userEditAttendance">Attendance</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="userEditLeave">Leave</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="userEditAttachment">Attachment</Nav.Link>
                      </Nav.Item>

                    </Nav>
                  </Col>

                  <Col sm={10}>
                    <Tab.Content>
                      <Tab.Pane eventKey="userDetail">
                        {this.state.selectedUser === null && (
                          <Button variant="outline-warning" size="lg" className="confirmEditButton">
                            Select a Staff member from the Master List
                          </Button>
                        )}
                        {this.state.isLoading === false &&
                          this.state.selectedUser !== null
                          && (
                            <UserDetail
                            authUserId={this.context.userId}
                            AuthContext={this.context}
                            user={this.state.selectedUser}
                            onEdit={this.startUpdateUserHandler}
                            canDelete={this.state.canDelete}
                            onDelete={this.modalDeleteHandler}
                            attendanceDelete={this.deleteUserAttendanceItem}
                            leaveDelete={this.deleteUserLeaveItem}
                            attachmentDelete={this.deleteUserAttachmentItem}
                            onViewAttachment={this.onViewAttachment}
                            onCreatePdf={this.createPdf}
                            />
                          )}
                      </Tab.Pane>

                      { this.context.user.role === "admin" && (
                        <Tab.Pane eventKey="userCreate">
                        <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startCreateUserHandler} >Create a NEW Staff Profile</Button>
                          {this.state.creating && (
                            <CreateUserForm
                              authUserId={this.context.userId}
                              canCancel
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.modalConfirmHandler}
                              onSubmit={this.modalConfirmHandler}
                              confirmText="Confirm"
                            />
                          )}
                        </Tab.Pane>
                      )}


                      <Tab.Pane eventKey="userEditDemographics">
                        {this.state.selectedUser === null && (
                          <Button variant="outline-warning" className="confirmEditButton" size="lg">
                            Select a Staff member from the Master List
                          </Button>
                        )}
                        {this.state.selectedUser !== null &&
                          this.context.user.role === "admin"
                          && (
                          <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit Demographics as Admin</Button>
                        )}
                        {this.state.selectedUser !== null &&
                          this.state.selectedUser._id === this.context.user._id
                          && (
                          <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit Demographics</Button>
                        )}
                        {this.state.selectedUser !== null &&
                          this.state.selectedUser._id === this.context.user._id && (
                          <Button variant="outline-danger" className="confirmEditButton" size="lg">
                            Your Profile
                          </Button>
                        )}
                        {this.state.selectedUser !== null &&
                          this.state.selectedUser._id !== this.context.user._id && (
                          <Button variant="outline-danger" className="confirmEditButton" size="lg">
                            Not my profile
                          </Button>
                        )}
                        {this.state.updating &&
                          this.state.selectedUser !== null
                          && (
                          <UpdateUserForm
                            authUserId={this.context.userId}
                            canCancel
                            canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalConfirmUpdateHandler}
                            confirmText="Confirm"
                            user={this.context.selectedUser}
                          />
                        )}
                      </Tab.Pane>

                      <Tab.Pane eventKey="userEditField">
                        {this.state.selectedUser === null && (
                          <Button variant="outline-warning" className="confirmEditButton" size="lg">
                            Select a Staff member from the Master List
                          </Button>
                        )}

                        {this.state.selectedUser !== null &&
                          this.context.user.role === "admin"
                          && (
                          <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit Field as Admin</Button>
                        )}
                        {this.state.selectedUser !== null &&
                          this.state.selectedUser._id === this.context.user._id
                          && (
                          <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.startUpdateUserHandler}>Edit a Single Field</Button>
                        )}
                        {this.state.selectedUser !== null &&
                          this.state.selectedUser._id === this.context.user._id && (
                          <Button variant="outline-success" className="confirmEditButton" size="lg">
                            Your Profile
                          </Button>
                        )}
                        {this.state.selectedUser !== null &&
                          this.state.selectedUser._id !== this.context.user._id && (
                          <Button variant="outline-danger" className="confirmEditButton" size="lg">
                            Not my profile
                          </Button>
                        )}
                        {this.state.updating &&
                          this.state.selectedUser !== null
                          && (
                            <UpdateUserFieldForm
                              authUserId={this.context.userId}
                              canCancel
                              canConfirm
                              onCancel={this.modalCancelHandler}
                              onConfirm={this.modalConfirmUpdateFieldHandler}
                              confirmText="Confirm"
                              user={this.state.selectedUser}
                            />
                        )}
                      </Tab.Pane>

                      <Tab.Pane eventKey="userEditAttendance">
                        {this.state.selectedUser === null && (
                          <Button variant="outline-warning" className="confirmEditButton" size="lg">
                            Select a Staff member from the Master List below
                          </Button>
                        )}

                        {this.state.selectedUser !== null &&
                          this.context.user.role === "admin"
                          && (
                          <Button variant="outline-primary" size="lg" className="confirmEditButton" value='attendance' onClick={this.updateUserSpecial.bind(this)}>Add Attendance as Admin</Button>
                        )}
                        {this.state.selectedUser !== null &&
                          this.state.selectedUser._id === this.context.user._id
                          && (
                          <Button variant="outline-primary" size="lg" className="confirmEditButton" value='attendance' onClick={this.updateUserSpecial.bind(this)}>Add Attendance</Button>
                        )}
                        {this.state.selectedUser !== null &&
                          this.state.selectedUser._id === this.context.user._id && (
                          <Button variant="outline-success" className="confirmEditButton" size="lg">
                            Your Profile
                          </Button>
                        )}
                        {this.state.selectedUser !== null &&
                          this.state.selectedUser._id !== this.context.user._id && (
                          <Button variant="outline-danger" className="confirmEditButton" size="lg">
                            Not my profile
                          </Button>
                        )}

                        {this.state.userUpdateField === 'attendance' &&
                        this.state.selectedUser !== null
                         && (
                           <UpdateUserAttendanceForm
                          authUserId={this.context.userId}
                          canCancel
                            canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.updateUserAttendanceHandler}
                            confirmText="Confirm"
                            user={this.state.selectedUser}
                          />
                        )}
                      </Tab.Pane>

                      <Tab.Pane eventKey="userEditLeave">
                      {this.state.selectedUser === null && (
                        <Button variant="outline-warning" className="confirmEditButton" size="lg">
                          Select a Staff member from the Master List
                        </Button>
                      )}

                      {this.state.selectedUser !== null &&
                        this.context.user.role === "admin"
                        && (
                        <Button variant="outline-primary" size="lg" className="confirmEditButton" value='leave' onClick={this.updateUserSpecial.bind(this)}>Add Leave as Admin</Button>
                      )}
                      {this.state.selectedUser !== null &&
                        this.state.selectedUser._id === this.context.user._id
                        && (
                        <Button variant="outline-primary" size="lg" className="confirmEditButton" value='leave' onClick={this.updateUserSpecial.bind(this)}>Add Leave</Button>
                      )}
                      {this.state.selectedUser !== null &&
                        this.state.selectedUser._id === this.context.user._id && (
                        <Button variant="outline-success" className="confirmEditButton" size="lg">
                          Your Profile
                        </Button>
                      )}
                      {this.state.selectedUser !== null &&
                        this.state.selectedUser._id !== this.context.user._id && (
                        <Button variant="outline-danger" className="confirmEditButton" size="lg">
                          Not my profile
                        </Button>
                      )}

                      {this.state.userUpdateField === 'leave' &&
                      this.state.selectedUser !== null
                      && (<UpdateUserLeaveForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.updateUserLeaveHandler}
                          confirmText="Confirm"
                          user={this.state.selectedUser}
                        />)}
                      </Tab.Pane>

                      <Tab.Pane eventKey="userEditAttachment">
                      {this.state.selectedUser === null && (
                        <Button variant="outline-warning" className="confirmEditButton" size="lg">
                          Select a Staff member from the Master List
                        </Button>
                      )}

                      {this.state.selectedUser !== null &&
                        this.context.user.role === "admin"
                        && (
                        <Button variant="outline-primary" size="lg" className="confirmEditButton" value='attachments' onClick={this.updateUserSpecial.bind(this)}>Add Attachment as Admin</Button>
                      )}
                      {this.state.selectedUser !== null &&
                        this.state.selectedUser._id === this.context.user._id
                        && (
                        <Button variant="outline-primary" size="lg" className="confirmEditButton" value='attachments' onClick={this.updateUserSpecial.bind(this)}>Add Attachment</Button>
                      )}
                      {this.state.selectedUser !== null &&
                        this.state.selectedUser._id === this.context.user._id && (
                        <Button variant="outline-success" className="confirmEditButton" size="lg">
                          Your Profile
                        </Button>
                      )}
                      {this.state.selectedUser !== null &&
                        this.state.selectedUser._id !== this.context.user._id && (
                        <Button variant="outline-danger" className="confirmEditButton" size="lg">
                          Not my profile
                        </Button>
                      )}

                      {this.state.userUpdateField === 'attachments' &&
                      this.state.selectedUser !== null
                      && (<UpdateUserAttachmentForm
                        authUserId={this.context.userId}
                        canCancel
                          canConfirm
                          onCancel={this.modalCancelHandler}
                          onConfirm={this.updateUserAttachmentHandler}
                          confirmText="Confirm"
                          user={this.state.selectedUser}
                        />)}
                      </Tab.Pane>

                      <Tab.Pane eventKey="MasterList">
                        <Container className="containerUserMasterList">
                        <Row className="searchListRow">
                        <Button variant="primary" size="sm" onClick={this.fetchUsersAsc}>
                           Sort Asc
                         </Button>
                        <Button variant="info" size="sm" onClick={this.fetchUsersDesc}>
                           Sort Desc
                         </Button>
                         {this.state.isLoading ? (
                           <Spinner />
                         ) : (
                           <UserList
                             users={this.state.users}
                             authUserId={this.context.userId}
                             onViewDetail={this.showDetailHandler}
                           />
                         )}
                        </Row>
                        </Container>
                      </Tab.Pane>

                      <Tab.Pane eventKey="SearchInput">
                        <Container className="containerSearchUserInput">

                        <Row className="searchUserRowAdd">
                        <Button variant="primary" className="searchButton" size="lg" onClick={this.startSearchUserHandler}>Search</Button>
                        </Row>

                        <Row className="searchUserRowForm">
                        <Col md={10} className="searchUserColForm">
                        <Tabs defaultActiveKey="Field" id="uncontrolled-tab-example">
                        <Tab eventKey="Search" title="Search:" disabled>
                        </Tab>
                        <Tab eventKey="Field" title="Search by Field:">
                        {this.state.searching !== true && (
                          <Button variant="outline-warning" className="confirmEditButton" size="lg">
                            Click the 'Search' Button start
                          </Button>
                        )}
                        {this.state.searching === true && (
                          <SearchUserForm
                          authUserId={this.context.userId}
                          canCancel
                            canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalConfirmSearchHandler}
                            confirmText="Search"
                            user={this.context.selectedUser}
                          />)}
                        </Tab>
                        <Tab eventKey="Id" title="Search by ID:">
                        {this.state.searching !== true && (
                          <Button variant="outline-warning" className="confirmEditButton" size="lg">
                            Click the 'Search' Button start
                          </Button>
                        )}
                        {this.state.searching === true && (
                          <SearchUserIdForm
                          authUserId={this.context.userId}
                          canCancel
                            canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalConfirmSearchIdHandler}
                            confirmText="Search"
                            user={this.context.selectedUser}
                          />
                          )}
                        </Tab>
                        <Tab eventKey="Attendance" title="Search by Attendance:">
                        {this.state.searching !== true && (
                          <Button variant="outline-warning" className="confirmEditButton" size="lg">
                            Click the 'Search' Button start
                          </Button>
                        )}
                        {this.state.searching === true && (
                          <SearchUserAttendanceDateForm
                          authUserId={this.context.userId}
                          canCancel
                            canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalConfirmSearchAttendanceDateHandler}
                            confirmText="Search"
                            user={this.context.selectedUser}
                          />
                          )}
                        </Tab>
                        <Tab eventKey="Leave" title="Search by Leave:">
                        {this.state.searching !== true && (
                          <Button variant="outline-warning" className="confirmEditButton" size="lg">
                            Click the 'Search' Button start
                          </Button>
                        )}
                        {this.state.searching === true && (
                          <SearchUserLeaveDateRangeForm
                          authUserId={this.context.userId}
                          canCancel
                            canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalConfirmSearchLeaveDateRangeHandler}
                            confirmText="Search"
                            user={this.context.selectedUser}
                          />
                          )}
                        </Tab>
                        <Tab eventKey="Name" title="Search by Name:">
                        {this.state.searching !== true && (
                          <Button variant="outline-warning" className="confirmEditButton" size="lg">
                            Click the 'Search' Button start
                          </Button>
                        )}
                        {this.state.searching === true && (
                          <SearchUserNameForm
                          authUserId={this.context.userId}
                          canCancel
                            canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalConfirmSearchNameHandler}
                            confirmText="Search"
                            user={this.context.selectedUser}
                          />
                        )}
                        </Tab>
                        </Tabs>
                        </Col>
                        <Col md={10}>
                        </Col>
                        </Row>

                        </Container>
                      </Tab.Pane>

                      <Tab.Pane eventKey="SearchResult">
                        <Container className="containerSearchUserResults">
                        <Row>
                          <Card className="searchCard">
                            <Card.Body className="searchCardBody">
                              <Card.Title>Your Search</Card.Title>
                              <Card.Text>
                                Field: {this.state.userSearchField}
                              </Card.Text>
                              <Card.Text>
                                Query: {this.state.userSearchQuery}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Row>
                        <Row className="searchListRow">

                        {this.state.searchUsers !== [] && (
                          <SearchUserList
                            searchUsers={this.state.searchUsers}
                            authUserId={this.context.userId}
                            onViewDetail={this.showDetailHandler}
                          />
                        )}
                        </Row>
                        </Container>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
            </Container>
        </Col>
      </Row>
  </Accordion>
</React.Fragment>
    );
  }
}

export default UsersPage;
