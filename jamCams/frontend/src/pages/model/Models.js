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
import ModelList from '../../components/Models/ModelList/ModelList';
import SearchModelList from '../../components/Models/ModelList/SearchModelList';
import ModelDetail from '../../components/Models/ModelDetail';

import Spinner from '../../components/Spinner/Spinner';
import SidebarPage from '../Sidebar';
import SidebarControl from '../../components/SidebarControl';
import AlertBox from '../../components/AlertBox';
import LoadingOverlay from '../../components/LoadingOverlay';
import AttachmentViewer from '../../components/AttachmentViewer';
import ModelDetailViewer from '../../components/ModelDetailViewer';

import SearchModelForm from '../../components/Forms/model/SearchModelForm';

import './Model.css';

class ModelsPage extends Component {
  state = {
    creating: false,
    updating: false,
    deleting: false,
    searching: false,
    model: null,
    models: [],
    searchModels: [],
    isLoading: false,
    isSorting: false,
    selectedUser: null,
    modelUpdateField: null,
    modelSearchField: null,
    modelSearchQuery: null,
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

    if (this.context.model.name === "Lady-of-the-Manor"){
      this.setState({canDelete: true})
    }

    if (JSON.stringify(this.context.selectedModel) !== "{}") {
      this.setState({ selectedModel: this.context.selectedModel })
    }

    this.fetchModels();
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

  fetchModels() {

    const activityId = this.context.activityId;
    this.setState({ isLoading: true, userAlert: "Fetching Staff Master List..." });
    const requestBody = {
      query: `
          query {models(activityId:"${activityId}")
          {_id,name,username,dob,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description},tokens,fans{_id,name,username},friends{_id,name},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time},transactions{_id,date,time}}}
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
        const responseAlert = JSON.stringify(resData.data).slice(0,8);
        this.setState({userAlert: responseAlert, models: resData.data.models, isLoading: false});
        this.context.models = this.state.models;
      })
      .catch(err => {
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  deleteListModel = () => {
    console.log("delete listed model");
  }



showDetailHandler = modelId => {

  this.setState(prevState => {
    const selectedModel = prevState.models.find(e => e._id === modelId);
    this.context.selectedModel = selectedModel;
    this.setState({selectedModel: selectedModel, showDetail: true});
    return { selectedModel: selectedModel };
  });
};

hideDetailHandler = () => {
  this.setState({showDetail: false, overlay: false})
}

selectModelNoDetail = (model) => {
  this.setState({selectedModel: model});
  this.context.selectedModel = model;
}

  onViewAttachment = (attachment) => {

      this.setState({showAttachment: true})

      const file = "https://ent-emr-bucket.s3-us-east-2.amazonaws.com/"+attachment.path+"/"+attachment.name;
      const type = attachment.format;

      this.setState({showThisAttachmentFile: file, showThisAttachmentType: type, })
  }

  closeAttachmentView = () => {

      this.setState({showAttachment: false})
  }

  modelSearchClearlHandler () {
    this.setState({searchModels: [], userAlert: "clearing model search results"});
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
        <ModelDetailViewer
          model={this.state.selectedModel}
          onHideModelDetail={this.hideDetailHandler}
          canDelete={this.state.canDelete}
          onDelete={this.deleteListModel}
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
                           <ModelList
                             models={this.state.models}
                             authId={this.context.activityId}
                             onViewDetail={this.showDetailHandler}
                             onSelectNoDetail={this.selectModelNoDetail}
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
                          <SearchModelForm
                          authId={this.context.activityId}
                          canCancel
                            canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalConfirmSearchHandler}
                            confirmText="Search"
                            model={this.context.selectedModel}
                            onSelectNoDetail={this.selectModelNoDetail}
                          />
                        </Tab>
                        </Tabs>
                        </Col>
                        </Row>

                        <Row>
                          <Card className="searchCard">
                            <Card.Body className="searchCardBody">
                              <Card.Title>This Search</Card.Title>
                              <Card.Text>
                                Field: {this.state.modelSearchField}  ,   Query: {this.state.modelSearchQuery}
                              </Card.Text>
                            </Card.Body>
                          </Card>
                        </Row>
                        <Row className="searchListRow1">

                        {this.state.searchModels !== [] && (
                          <SearchModelList
                            searchModels={this.state.searchModels}
                            authId={this.context.activityId}
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

export default ModelsPage;
