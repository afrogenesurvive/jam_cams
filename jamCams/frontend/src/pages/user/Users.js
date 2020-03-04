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

// import SearchUserForm from '../components/Forms/SearchUserForm';
// import SearchUserIdForm from '../components/Forms/SearchUserIdForm';

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

    if (JSON.stringify(this.context.selectedUser) !== "{}") {
      this.setState({ selectedUser: this.context.selectedUser })
    }

    this.fetchUsers();
  }



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



  modalCancelHandler = () => {
    this.setState({ creating: false, updating: false, deleting: false, searching: false});
  };

  fetchUsers() {

    const activityId = this.context.activityId;
    this.setState({ isLoading: true, userAlert: "Fetching Staff Master List..." });
    const requestBody = {
      query: `
          query {users(activityId:"${activityId}")
          {_id,name,role,dob,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
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
              <Tab.Container id="left-tabs-example" defaultActiveKey="MasterList">
                <Row>
                  <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="MasterList">MASTER LIST</Nav.Link>
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
                            authId={this.context.activityId}
                            AuthContext={this.context}
                            user={this.state.selectedUser}
                            onViewAttachment={this.onViewAttachment}
                            />
                          )}
                      </Tab.Pane>

                      <Tab.Pane eventKey="MasterList">
                        <Container className="containerUserMasterList">
                        <Row className="searchListRow">

                         {this.state.isLoading ? (
                           <Spinner />
                         ) : (
                           <UserList
                             users={this.state.users}
                             authId={this.context.activityId}
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
