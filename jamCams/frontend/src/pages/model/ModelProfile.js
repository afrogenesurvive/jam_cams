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
          {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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
        {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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

      const profileImageName = event.target.formGridFilename.value;
      const profileImageType = event.target.formGridFiletype.value;
      const profileImagePath = event.target.formGridFilepath.value;

      const requestBody = {
        query:`
        mutation {addModelProfileImage(activityId:"${activityId}", modelId:"${activityId}",modelInput:{
          profileImageName:"${profileImageName}",
          profileImageType:"${profileImageType}",
          profileImagePath:"${profileImagePath}",
        })
        {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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
  deleteModelProfileImage = (event) => {
      const token = this.context.token;
      const activityId = this.context.activityId;

      this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

      const profileImageName = event.name;
      const profileImageType = event.type;
      const profileImagePath = event.path;

      const requestBody = {
        query:`
        mutation {deleteModelProfileImage(activityId:"${activityId}", modelId:"${activityId}",modelInput:{
          profileImageName:"${profileImageName}",
          profileImageType:"${profileImageType}",
          profileImagePath:"${profileImagePath}",
        })
        {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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

          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, model: resData.data.deleteModelProfileImage})
          this.context.model = this.state.model;
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
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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
  deleteModelPerk = (event) => {
    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

    const perkDate = event.date;
    const perkName = event.name;
    const perkDescription = event.description;

    const requestBody = {
      query:`
      mutation {deleteModelPerk(activityId:"${activityId}", modelId:"${activityId}",modelInput: {
        perkDate:"${perkDate}",
        perkName:"${perkName}",
        perkDescription:"${perkDescription}",
      })
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, model: resData.data.deleteModelPerk})
        this.context.model = this.state.model;
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
      mutation {addModelTrait(activityId:"${activityId}", modelId:"${activityId}",
      modelInput: {
        traitKey:"${traitKey}",
        traitValue:"${traitValue}",
      })
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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
  deleteModelTrait = (event) => {
    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

    const traitKey = event.key;
    const traitValue = event.value;

    const requestBody = {
      query:`
      mutation {deleteModelTrait(activityId:"${activityId}", modelId:"${activityId}",
      modelInput: {
        traitKey:"${traitKey}",
        traitValue:"${traitValue}",
      })
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, model: resData.data.deleteModelTrait})
        this.context.model = this.state.model;
        this.getThisModel();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  };

  addModelModelNameHandler = (event) => {
      const token = this.context.token;
      const activityId = this.context.activityId;

      this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });
      const modelName = event.target.formGridModelName.value;

      const requestBody = {
        query:`
        mutation {addModelModelName(activityId:"${activityId}", modelId:"${activityId}",
        modelInput:{
          modelName:"${modelName}"
        })
        {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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

          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, model: resData.data.addModelModelName})
          this.context.model = this.state.model;
          this.getThisModel();
        })
        .catch(err => {
          this.setState({userAlert: err});
        });
    };
  deleteModelModelName = (event) => {
      const token = this.context.token;
      const activityId = this.context.activityId;

      this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });
      const modelNames = event.modelName;

      const requestBody = {
        query:`
        mutation {deleteModelModelNames(activityId:"${activityId}", modelId:"${activityId}",
        modelInput:{
          modelName:"${modelNames}"
        })
        {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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

          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, model: resData.data.deleteModelModelNames})
          this.context.model = this.state.model;
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
      mutation {addModelInterests(activityId:"${activityId}", modelId:"${activityId}",
        modelInput: {
          interests:"${interests}"
        })
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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
  deleteModelInterests = (event) => {
    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

    const interests = event.interest;

    const requestBody = {
      query:`
      mutation {deleteModelInterests(activityId:"${activityId}", modelId:"${activityId}",
        modelInput: {
          interests:"${interests}"
        })
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, model: resData.data.deleteModelInterests})
        this.context.model = this.state.model;
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
      mutation {addModelCategories(activityId:"${activityId}", modelId:"${activityId}",
        modelInput: {
          categories:"${categories}"
        })
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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
  deleteModelCategories = (event) => {
    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

    const categories = event.category;

    const requestBody = {
      query:`
      mutation {deleteModelCategories(activityId:"${activityId}", modelId:"${activityId}",
          modelInput: {
            categories:"${categories}"
          })
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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
        this.setState({ userAlert: responseAlert, model: resData.data.deleteModelCategories})
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
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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
  deleteModelTags = (event) => {
    const token = this.context.token;
    const activityId = this.context.activityId;

    this.setState({ adding: false, modelAddField: null, userAlert: "Updating selected Staff by Field..." });

    const tags = event.tag;

    const requestBody = {
      query:`
      mutation {deleteModelTags(activityId:"${activityId}", modelId:"${activityId}",
        modelInput:{
          tags:"${tags}"
        })
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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

        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, model: resData.data.deleteModelTags})
        this.context.model = this.state.model;
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
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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

  CreateContentHandler = (event) => {
    console.log("creating content for model",this.context.activityId);
    this.setState({ adding: false });
    const token = this.context.token;
    const activityId = this.context.activityId;

    const date = new Date();
    const type = event.target.formGridTypeSelect.value;
    const title= event.target.formGridTitle.value;
    const fileName = event.target.formGridFileName.value;
    const fileSize = event.target.formGridFileSize.value;
    const fileType = event.target.formGridFileType.value;
    const filePath = event.target.formGridFilePath.value;

    const requestBody = {
      query:`
        mutation {createContent(activityId:"${activityId}",creatorId:"${activityId}",
          contentInput:{
            date:"${date}",
            type:"${type}",
            title:"${title}",
            fileName:"${fileName}",
            fileType:"${fileType}",
            fileSize:"${fileSize}",
            filePath:"${filePath}"
          })
        {_id,date,type,title,file{name,type,size,path},creator{_id,name,username,profileImages{name,type,path}},models{_id,name,username,profileImages{name,type,path}},viewCount,likes{date,user{_id,name,username,profileImages{name,type,path}}},likeCount,comments{_id},tags}}
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
        console.log(resData);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert});
        this.context.userAlert = responseAlert;
        this.context.receiver = null;
        this.getThisModel();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }

  modelCreateMessage = (event) => {

    this.setState({ adding: false });
    const token = this.context.token;
    const receiver = this.context.receiver;
    const receiverId = this.context.receiver._id;
    const receiverRole = this.context.receiver.role;
    const role = this.context.role;
    const activityId = this.context.activityId;

    const date = new Date();
    const timeString1 = date.toISOString().slice(11,16);
    const timeString2 = date.toLocaleString().slice(11,16);
    const type = event.target.formGridTypeSelect.value;
    const subject = event.target.formGridSubject.value;
    const message = event.target.formGridMessage.value;

    const requestBody = {
      query:`
        mutation {createMessage(
          senderRole:"${role}",
          receiverRole:"${receiverRole}",
          senderId:"${activityId}",
          receiverId:"${receiverId}",
          messageInput: {
            date:"${date}",
            time:"${timeString2}",
            type:"${type}",
            subject:"${subject}",
            message:"${message}"
          })
        {_id,date,time,type,subject,sender{role,username,ref},receiver{role,username,ref},message,read}}
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
        console.log(resData);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert});
        this.context.userAlert = responseAlert;
        this.context.receiver = null;
        this.getThisModel();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }

  modelCreateTransaction = (event) => {

    this.setState({ adding: false });
    const token = this.context.token;
    const receiver = this.context.receiver;
    const receiverId = this.context.receiver._id;
    const receiverRole = this.context.receiver.role;
    const role = this.context.role;
    const activityId = this.context.activityId;

    const date = new Date();
    const timeString1 = date.toISOString().slice(11,16);
    const timeString2 = date.toLocaleString().slice(11,16);
    const type = event.target.formGridTypeSelect.value;
    const description = event.target.formGridDescription.value;
    const amount = event.target.formGridAmount.value;

    const requestBody = {
      query:`
        mutation {createTransaction(
          senderRole:"${role}",
          receiverRole:"${receiverRole}",
          senderId:"${activityId}",
          receiverId:"${receiverId}",
          transactionInput: {
            date:"${date}",
            time:"${timeString2}",
            type:"${type}",
            description:"${description}",
            amount:${amount}
          })
        {_id,date,time,type,sender{role,username,ref},receiver{role,username,ref},amount,description}}
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
        console.log(resData);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert});
        this.context.userAlert = responseAlert;
        // this.context.user = this.state.user;
        this.context.receiver = null;
        // this.getThisUser();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }


  getThisModel() {
    this.setState({ isLoading: true });
    const activityId = this.context.activityId;
    const requestBody = {
      query: `
      query {getThisModel(activityId:"${activityId}")
      {_id,name,role,dob,username,modelNames,contact{email,phone},address{number,street,town,city,country},bio,socialMedia{platform,handle},traits{key,value},profileImages{name,type,path},interests,perks{date,name,description,imageLink},tokens,fans{_id,name,username,profileImages{name,type,path},interests,bio,tags},friends{_id,name,username,profileImages{name,type,path},interests,bio,tags},tags,loggedIn,categories,shows{_id,scheduledDate,scheduledTime},content{_id,title},comments{_id,date,content{_id}},messages{_id,date,time,type,subject,message,sender{role,username,ref},receiver{role,username,ref}},transactions{_id,date,time,type,amount,description,sender{role,username,ref},receiver{role,username,ref}}}}
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
          this.context.model = this.state.model;
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
    this.setState({ updating: false, updatingField: false, adding: false, modelAddField: null  });
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
  addModelProfileImage = () => {
    this.setState({adding: true, modelAddField: "profileImage"})
  }
  addModelModelName = () => {
    this.setState({adding: true, modelAddField: "modelName"})
  }
  addModelTrait = () => {
    this.setState({adding: true, modelAddField: "trait"})
  }
  addModelSocialMedia = () => {
    this.setState({adding: true, modelAddField: "socialMedia"})
  }
  addModelPerk = () => {
    this.setState({adding: true, modelAddField: "perk"})
  }
  addModelInterests = () => {
    this.setState({adding: true, modelAddField: "interests"})
  }
  addModelTags = () => {
    this.setState({adding: true, modelAddField: "tags"})
  }
  addModelCategories = () => {
    this.setState({adding: true, modelAddField: "categories"})
  }
  addModelTokens = () => {
    this.setState({adding: true, modelAddField: "tokens"})
  }
  addModelContent = () => {
    this.setState({adding: true, modelAddField: "content"})
  }
  startCreateMessage = () => {
    this.setState({adding: true, modelAddField: "message"})
  }
  startCreateMessage = () => {
    this.setState({adding: true, modelAddField: "transaction"})
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

          <Row>
            <Col>
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
                        addPerk={this.addModelPerkHandler}
                        addInterests={this.addModelInterestsHandler}
                        addCategories={this.addModelCategoriesHandler}
                        addTags={this.addModelTagsHandler}
                        addModelName={this.addModelModelNameHandler}
                        addTokens={this.addModelTokensHandler}

                        createMessage={this.modelCreateMessage}
                        createTransaction={this.modelCreateTransaction}
                        createContent={this.CreateContentHandler}

                        onProfileImageDelete={this.deleteModelProfileImage}
                        onSocialMediaDelete={this.deleteModelSocialMedia}
                        onTraitDelete={this.deleteModelTrait}
                        onTagsDelete={this.deleteModelTags}
                        onContentDelete={this.deleteModelContent}
                        onModelNameDelete={this.deleteModelModelName}
                        onInterestDelete={this.deleteModelInterests}
                        onCategoriesDelete={this.deleteModelCategories}
                        onMessageDelete={this.deleteModelMessage}
                        onTransactionDelete={this.deleteModelTransaction}

                        onCancel={this.modalCancelHandler}

                        onStartUpdate={this.startUpdateModelHandler}
                        onStartUpdateField={this.startUpdateModelFieldHandler}
                        onStartAddProfileImage={this.addModelProfileImage}
                        onStartAddSocialMedia={this.addModelSocialMedia}
                        onStartAddTrait={this.addModelTrait}
                        onStartAddModelName={this.addModelModelName}
                        onStartAddInterests={this.addModelInterests}
                        onStartAddTags={this.addModelTags}
                        onStartAddPerk={this.addModelPerk}
                        onStartAddCategories={this.addModelCategories}
                        onStartAddTokens={this.addModelTokens}
                        onStartAddContent={this.addModelContent}
                        onStartCreateMessage={this.startCreateMessage}
                        onStartCreateTransaction={this.startCreateTransaction}

                        updating={this.state.updating}
                        updatingField={this.state.updatingField}
                        modelAddField={this.state.modelAddField}

                        selectedUser={this.context.selectedUser}
                        selectedModel={this.context.selectedModel}
                        messageReceiver={this.context.receiver}
                      />
                    )}

            </Col>
          </Row>

        </Container>
      </Col>
      </Row>
      </React.Fragment>
    );
  }
}

export default ModelProfile;
