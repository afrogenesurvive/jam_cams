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
import ContentList from '../../components/Content/ContentList/ContentList';
import ContentDetail from '../../components/Content/ContentDetail';

import Spinner from '../../components/Spinner/Spinner';
import SidebarPage from '../Sidebar';
import SidebarControl from '../../components/SidebarControl';
import AlertBox from '../../components/AlertBox';
import LoadingOverlay from '../../components/LoadingOverlay';
import AttachmentViewer from '../../components/AttachmentViewer';
import ContentDetailViewer from '../../components/ContentDetailViewer';

import './Users.css';

class ContentPage extends Component {
  state = {
    creating: false,
    updating: false,
    deleting: false,
    searching: false,
    content: null,
    contents: [],
    searchContent: [],
    isLoading: false,
    isSorting: false,
    selectedContent: null,
    contentUpdateField: null,
    contentSearchField: null,
    contentSearchQuery: null,
    canDelete: null,
    userAlert: null,
    overlay: false,
    overlayStatus: "test",
    file: null,
    showDetail: false,
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

    if (this.context.user.name === "Lord-of-the-Manor" || this.context.model.name === "Lady-of-the-Manor"){
      this.setState({canDelete: true})
    }

    this.fetchContent();
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

  fetchContent() {

    const activityId = this.context.activityId;
    this.setState({ isLoading: true, userAlert: "Fetching Staff Master List..." });
    const requestBody = {
      query: `
          query {content(activityId:"${activityId}")
          {_id,date,type,title,file{name,type,size,path},creator{_id,name,username,profileImages{name,type,path}},models{_id,name,username,profileImages{name,type,path}},viewCount,likes{date},likeCount,comments{_id},tags}}
        `};

    fetch('http://localhost:9009/graphql', {
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
        console.log(resData);
        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert, contents: resData.data.content, isLoading: false});
        this.context.contents = this.state.contents;
      })
      .catch(err => {
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  deleteListContent = (contentId) => {
    console.log("delete listed content", contentId);
  }

showDetailHandler = contentId => {

  this.setState(prevState => {
    const selectedContent = prevState.contents.find(e => e._id === contentId);
    this.context.selectedContent = selectedContent;
    this.setState({selectedContent: selectedContent, showDetail: true});
    return { selectedContent: selectedContent };
  });
};

selectContentNoDetail = (content) => {
  this.setState({selectedContent: content});
  this.context.selectedContent = content;
}

hideDetailHandler = () => {
  this.setState({showDetail: false, overlay: false})
}


  userSearchClearlHandler () {
    this.setState({searchContent: [], userAlert: "clearing user search results"});
  }

  showSidebar = () => {
      this.setState({
        sidebarShow: true,
        mCol2Size: 9
      })
  }

  hideSidebar = () => {
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
      {
      //   <AlertBox
      //   authId={this.context.activityId}
      //   alert={this.state.userAlert}
      // />
      }

      {this.state.showDetail === true && (
        <ContentDetailViewer
          content={this.state.selectedContent}
          onHideContentDetail={this.hideDetailHandler}
          canDelete={this.state.canDelete}
          onDelete={this.deleteListContent}
        />
      )}
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

        {this.state.sidebarShow === true &&
          this.context.role === "User" && (
          <Col md={2} className="MasterCol1">
          <SidebarPage
            you={this.state.user}
            alert={this.state.userAlert}
            authId={this.context.activityId}
          />
          </Col>
        )}
        {this.state.sidebarShow === true &&
          this.context.role === "Model" &&(
          <Col md={2} className="MasterCol1">
          <SidebarPage
            you={this.state.model}
            alert={this.state.userAlert}
            authId={this.context.activityId}
          />
          </Col>
        )}

        <Col md={this.state.mCol2Size} className="MasterCol2">
            <Container className="containerCombinedDetail1">
              <Tab.Container id="left-tabs-example" defaultActiveKey="MasterList">
                <Row>
                  <Col sm={2} className="userListSubMenuCol">
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="MasterList">List</Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="SearchInput">Search</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>

                  <Col sm={10} className="userListMainCol">
                    <Tab.Content>

                      <Tab.Pane eventKey="MasterList">
                        <Row className="userListRow">

                         {this.state.isLoading ? (
                           <Spinner />
                         ) : (
                           <ContentList
                             contents={this.state.contents}
                             authId={this.context.activityId}
                             onViewDetail={this.showDetailHandler}
                             onSelectNoDetail={this.selectContentNoDetail}
                           />
                         )}
                        </Row>
                      </Tab.Pane>

                      <Tab.Pane eventKey="SearchInput">
                        <Container className="containerSearchUserInput1">

                        <Row className="searchUserRowForm1">
                        <Col md={10} className="searchUserColForm">
                        <Tabs defaultActiveKey="Field" id="uncontrolled-tab-example">

                        <Tab eventKey="Field" title="Search by Field:">

                        </Tab>
                        </Tabs>
                        </Col>
                        </Row>

                        <Row>
                          <Card className="searchCard">
                            <Card.Body className="searchCardBody">
                              <Card.Title>This Search</Card.Title>
                              <Card.Text>
                                Field: {this.state.contentSearchField}  ,   Query: {this.state.contentSearchQuery}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Row>
                        <Row className="searchListRow1">

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

export default ContentPage;
