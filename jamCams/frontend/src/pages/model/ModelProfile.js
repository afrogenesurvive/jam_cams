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

import './Model.css';

class ModelProfile extends Component {
  state = {
    model: null,
    models: [],
    updating: false,
    updatingField: false,
    adding: false,
    modelAddField: null,
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
    this.getThisModel();
  }

  startUpdateModelHandler = () => {
    this.setState({ updating: true });
  };
  startUpdateModelFieldHandler = () => {
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
      contactEmail = this.context.model.conatct.email;
    }
    if (password.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      password = this.context.model.password;
    }
    if (name.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      name = this.context.model.name;
    }
    if (username.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      username = this.context.model.username;
    }
    // if (role.trim().length === 0) {
    //   console.log("blank fields detected!!!...filling w/ previous data...");
    //   role = this.state.user.role;
    // }
    if (dob.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      dob = this.context.model.dob;
    }
    if (contactPhone.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      contactPhone = this.context.model.conatct.phone;
    }
    if (addressNumber.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressNumber = this.context.model.address.number;
    }
    if (addressStreet.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressStreet = this.context.model.address.street;
    }
    if (addressTown.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressTown = this.context.model.address.town;
    }
    if (addressCity.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressCity = this.context.model.address.city;
    }
    if (addressCountry.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressCountry = this.context.model.address.country;
    }
    if (addressPostalCode.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      addressPostalCode = this.context.model.address.postalCode;
    }
    if (bio.trim().length === 0) {
      this.setState({ userAlert: "blank fields detected!!!...filling w/ previous data..."});
      bio = this.context.model.bio;
    }

    const requestBody = {
      query: `
          mutation {updateModel(activityId:"${activityId}", modelId:"${activityId}",
          modelInput:{
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
          {_id,name,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description},tokens,fans{_id,name,username},friends{_id,name},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time},transactions{_id,date,time}}}
        `};

    fetch('http://localhost:9009/graphql', {
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
        const updatedModel = resData.data.updateModel;
        this.context.model = updatedModel;
        const responseAlert = JSON.stringify(resData.data).slice(2,25);

        this.setState({ userAlert: responseAlert, model: updatedModel})
        this.getThisModel();
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
        mutation {updateModelField(activityId:"${activityId}", modelId:"${activityId}",field:"${field}", query:"${query}")
        {_id,name,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description},tokens,fans{_id,name,username},friends{_id,name},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time},transactions{_id,date,time}}}
        `};

      fetch('http://localhost:9009/graphql', {
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
          const updatedModel = resData.data.updateModelField
          this.context.model = resData.data.updateModelField;

          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, model: resData.data.updateModelField})
          this.getThisModel();
        })
        .catch(err => {
          this.setState({userAlert: err});
        });
    }

  addModelProfileImageHandler = (event) => {
      const token = this.context.token;
      const activityId = this.context.activityId;

      this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

      const profileImagenName = event.target.formGridFilename.value;
      const profileImageType = event.target.formGridFiletype.value;
      const profileImagePath = event.target.formGridFilepath.value;

      const requestBody = {
        query:`
        mutation {addModelProfileImage(activityId:"${activityId}", modelId:"${activityId}",modelInput:{
          profileImagenName:"${profileImagenName}",
          profileImageType:"${profileImageType}",
          profileImagePath:"${profileImagePath}",
        })
        {_id,name,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description},tokens,fans{_id,name,username},friends{_id,name},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time},transactions{_id,date,time}}}
        `};

      fetch('http://localhost:9009/graphql', {
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
          this.context.model = resData.data.addModelProfileImage;

          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, model: resData.data.addModelProfileImage})
          this.getThisModel();
        })
        .catch(err => {
          this.setState({userAlert: err});
        });
    };

  addModelPerkHandler = (event) => {
    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

    const perkDate = new Date();
    const perkName = event.target.formGridName.value;
    const perkDescription = event.target.formGridDescription.value;

    const requestBody = {
      query:`
      mutation {addModelPerk(activityId:"${activityId}", modelId:"${activityId}",modelInput: {
        perkDate:"${perkDate}",
        perkName:"${perkName}",
        perkDescription:"${perkDescription}",
      })
      {_id,name,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description},tokens,fans{_id,name,username},friends{_id,name},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time},transactions{_id,date,time}}}
      `};

    fetch('http://localhost:9009/graphql', {
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
        this.context.model = resData.data.addModelPerk;

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, model: resData.data.addModelPerk})
        this.getThisModel();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };

  addModelTraitHandler = (event) => {
    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

    const traitKey = event.target.formGridKey.value;
    const traitValue = event.target.formGridValue.value;

    const requestBody = {
      query:`
      mutation {addModelTrait(activityId:"${activityId}", modelId:"${activityId}",modelInput: {
        traitKey:"${traitKey}",
        traitValue:"${traitValue}",
      })
      {_id,name,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description},tokens,fans{_id,name,username},friends{_id,name},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time},transactions{_id,date,time}}}
      `};

    fetch('http://localhost:9009/graphql', {
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
        this.context.model = resData.data.addModelTrait;

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, model: resData.data.addModelTrait})
        this.getThisModel();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };

  addModelInterestsHandler = (event) => {
    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

    const preInterests = event.target.formGridInterests.value;
    const interests = preInterests.split("");

    const requestBody = {
      query:`
      mutation {addModelInterests(activityId:"${activityId}", modelId:"${activityId}",interests:${interests})
      {_id,name,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description},tokens,fans{_id,name,username},friends{_id,name},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time},transactions{_id,date,time}}}
      `};

    fetch('http://localhost:9009/graphql', {
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
        this.context.model = resData.data.addModelInterests;

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, model: resData.data.addModelInterests})
        this.getThisModel();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };

  addModelCategoriesHandler = (event) => {
    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

    const preCategories = event.target.formGridCategories.value;
    const categories = preCategories.split("");

    const requestBody = {
      query:`
      mutation {addModelCategories(activityId:"${activityId}", modelId:"${activityId}",categories:${categories})
      {_id,name,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description},tokens,fans{_id,name,username},friends{_id,name},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time},transactions{_id,date,time}}}
      `};

    fetch('http://localhost:9009/graphql', {
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
        this.context.model = resData.data.addModelCategories;

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, model: resData.data.addModelCategories})
        this.getThisModel();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };

  addModelTagsHandler = (event) => {
    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

    const preTags = event.target.formGridTags.value;
    const tags = preTags.split("");

    const requestBody = {
      query:`
      mutation {addModelTags(activityId:"${activityId}", modelId:"${activityId}",tags:${tags})
      {_id,name,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description},tokens,fans{_id,name,username},friends{_id,name},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time},transactions{_id,date,time}}}
      `};

    fetch('http://localhost:9009/graphql', {
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
        this.context.model = resData.data.addModelTags;

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, model: resData.data.addModelTags})
        this.getThisModel();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };

  addModelTokensHandler = (event) => {
    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

    const tokens = event.target.formGridTokens.value;
    console.log(parseInt(tokens));

    const requestBody = {
      query:`
      mutation{addModelTokens(activityId:"${activityId}",modelId:"${activityId}",modelInput:{tokens:${tokens}})
      {_id,name,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description},tokens,fans{_id,name,username},friends{_id,name},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time},transactions{_id,date,time}}}
      `};

    fetch('http://localhost:9009/graphql', {
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
        this.context.model = resData.data.addModelTokens;

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, model: resData.data.addModelTokens})
        this.getThisModel();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };

  getThisModel() {
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

        if (this.isActive) {
          this.setState({ model: thisModel, isLoading: false });
        }
        this.context.model = this.state.model;
      })
      .catch(err => {
        this.setState({userAlert: err});
        if (this.isActive) {
          this.setState({ isLoading: false });
        }
      });
  }

  modalCancelHandler = () => {
    this.setState({ updating: false ,updatingField: false });
  };

  updateModelSpecialProfile (event) {

    const field = event.target.value;
    this.setState({ modelUpdateField: field});
  }

  showSidebar = () => {
      this.setState({
        sidebarShow: true,
        mCol2Size: 9
      });
  }

  hideSidebar = () => {
      this.setState({
        sidebarShow: false,
        mCol2Size: 11
      })
  }

  addModelField = (args) => {
    this.setState({adding: true, modelAddField: args})
  }
  addUserProfileImage = () => {
    this.setState({adding: true, userAddField: "profileImage"})
  }
  addUserTrait = () => {
    this.setState({adding: true, userAddField: "trait"})
  }
  addUserSocialMedia = () => {
    this.setState({adding: true, userAddField: "socialMedia"})
  }
  addUserPerk = () => {
    this.setState({adding: true, userAddField: "perk"})
  }
  addUserInterests = () => {
    this.setState({adding: true, userAddField: "interests"})
  }
  addUserTags = () => {
    this.setState({adding: true, userAddField: "tags"})
  }
  addUserCategories = () => {
    this.setState({adding: true, userAddField: "categories"})
  }
  addUserTokens = () => {
    this.setState({adding: true, userAddField: "tokens"})
  }


  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>


      {
      //   <AlertBox
      //   authId={this.context.activityId}
      //   alert={this.state.userAlert}
      // />
      }

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

      {this.state.sidebarShow === true &&
        this.state.model !== null && (
        <Col md={2} className="MasterCol1">
        <SidebarPage
          you={this.state.model}
          alert={this.state.userAlert}
          authId={this.context.activityId}
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
                  <Nav.Link eventKey="..." disabled>...</Nav.Link>
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
                        onEdit={this.modalConfirmUpdateHandler}
                        onEditField={this.modalConfirmUpdateFieldHandler}
                        addProfileImage={this.addModelProfileImageHandler}
                        addSocialMedia={this.addModelSocialMediaHandler}
                        addTrait={this.addModelTraitHandler}
                        addPerk={this.addUserPerkHandler}
                        addInterests={this.addModelInterestsHandler}
                        addCategories={this.addModelCategoriesHandler}
                        addTags={this.addModelTagsHandler}
                        addTokens={this.addModelTokensHandler}
                        onProfileImageDelete={this.deleteModelProfileImage}
                        onSocialMediaDelete={this.deleteModelSocialMedia}
                        onTraitDelete={this.deleteModelTrait}
                        onTagsDelete={this.deleteModelTags}
                        onInterestDelete={this.deleteModelInterests}
                        onCategoriesDelete={this.deleteModelCategories}
                        onCancel={this.modalCancelHandler}
                        onStartUpdate={this.startUpdateModelHandler}
                        onStartUpdateField={this.startUpdateModelFieldHandler}
                        onStartAddProfileImage={this.addModelProfileImage}
                        onStartAddSocialMedia={this.addModelSocialMedia}
                        onStartAddTrait={this.addModelTrait}
                        onStartAddInterests={this.addModelInterests}
                        onStartAddTags={this.addModelTags}
                        onStartAddCategories={this.addModelCategories}
                        onStartAddTokens={this.addModelTokens}
                        updatingField={this.state.updatingField}
                        modelAddField={this.state.modelAddField}
                        selectedUser={this.context.selectedUser}
                      />
                    )}

                </Tab.Pane>

                <Tab.Pane eventKey="...">

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
