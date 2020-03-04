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
import AddUserProfileImageForm from '../../components/Forms/user/AddUserProfileImageForm';
import AddUserPerkForm from '../../components/Forms/user/AddUserPerkForm';
import AddUserInterestsForm from '../../components/Forms/user/AddUserInterestsForm';
import AddUserTagsForm from '../../components/Forms/user/AddUserTagsForm';
import AddUserTokensForm from '../../components/Forms/user/AddUserTokensForm';
import AddUserComplaintForm from '../../components/Forms/user/AddUserComplaintForm';

import './Users.css';

class UserProfile extends Component {
  state = {
    user: null,
    users: [],
    updating: false,
    adding: false,
    updatingField: false,
    isLoading: false,
    userUpdateField: null,
    userAddField: null,
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
    this.getThisUser();
    // if (this.context.user.name === "Lord-of-the-Manor"){
    //   console.log("Welcome back my Mi'Lord...");
    //   this.setState({canDelete: true})
    // }

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
    let username = event.target.formGridUsername.value;
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
          mutation {updateUser(
            activityId:"${activityId}",
            userId:"${activityId}",
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
            bio:"${bio}"
          })
          {_id,name,dob,role,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description,imageLink},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
        `};

        console.log(requestBody);

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
          mutation {updateUserField(activityId:"${activityId}",userId:"${activityId}",field:"${field}",query:"${query}")
          {_id,name,dob,role,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description,imageLink},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
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

    addUserProfileImageHandler = (event) => {
      const token = this.context.token;
      const activityId = this.context.activityId;

      this.setState({ adding: false, userAddField: null, userAlert: "Updating selected Staff by Field..." });

      const profileImageName = event.target.formGridFilename.value;
      const profileImageType = event.target.formGridFiletype.value;
      const profileImagePath = event.target.formGridFilepath.value;

      const requestBody = {
        query:`
        mutation {addUserProfileImage(activityId:"${activityId}", userId:"${activityId}",userInput:{
          profileImageName:"${profileImageName}",
          profileImageType:"${profileImageType}",
          profileImagePath:"${profileImagePath}",
        })
        {_id,name,dob,role,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description,imageLink},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
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
          console.log("11",resData.data.addUserProfileImage);
          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, user: resData.data.addUserProfileImage})
          this.context.user = this.state.user;
          // this.getThisUser();
        })
        .catch(err => {
          this.setState({userAlert: err});
        });
    };

    addUserPerkHandler = (event) => {
      const token = this.context.token;
      const activityId = this.context.activityId;

      this.setState({ adding: false, userAddField: null, userAlert: "Updating selected Staff by Field..." });

      const perkDate = new Date();
      const perkName = event.target.formGridName.value;
      const perkDescription = event.target.formGridDescription.value;
      const perkImageLink = event.target.formGridImageLink.value;

      const requestBody = {
        query:`
        mutation {addUserPerk(activityId:"${activityId}", userId:"${activityId}",
        userInput: {
          perkDate:"${perkDate}",
          perkName:"${perkName}",
          perkDescription:"${perkDescription}",
          perkImageLink:"${perkImageLink}",
        })
        {_id,name,dob,role,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description,imageLink},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
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
          this.context.user = resData.data.addUserPerk;

          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, user: resData.data.addUserPerk})
          this.getThisUser();
        })
        .catch(err => {
          this.setState({userAlert: err});
        });
    };

    addUserInterestsHandler = (event) => {
      const token = this.context.token;
      const activityId = this.context.activityId;

      this.setState({ adding: false, userAddField: null, userAlert: "Updating selected Staff by Field..." });

      const preInterests = event.target.formGridInterests.value;
      const interests = preInterests.split(",");


      const requestBody = {
        query:`
        mutation {addUserInterests(activityId:"${activityId}", userId:"${activityId}",interests:${interests})
        {_id,name,dob,role,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description,imageLink},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
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
          this.context.user = resData.data.addUserInterests;

          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, user: resData.data.addUserInterests})
          this.getThisUser();
        })
        .catch(err => {
          this.setState({userAlert: err});
        });
    };

    addUserTagsHandler = (event) => {
      const token = this.context.token;
      const activityId = this.context.activityId;

      this.setState({ adding: false, userAddField: null, userAlert: "Updating selected Staff by Field..." });

      const preTags = event.target.formGridTags.value;
      const tags = preTags.split(",");


      const requestBody = {
        query:
        `
        mutation {addUserTags(activityId:"${activityId}", userId:"${activityId}",
        userInput:{tags:\"${tags}\"})
        {_id,name,dob,role,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description,imageLink},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
        `
      };

        console.log(preTags, tags, JSON.stringify(requestBody));

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
          this.context.user = resData.data.addUserTags;

          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, user: resData.data.addUserTags})
          this.getThisUser();
        })
        .catch(err => {
          this.setState({userAlert: err});
        });
    };

    addUserTokensHandler = (event) => {
      const token = this.context.token;
      const activityId = this.context.activityId;

      this.setState({ adding: false, userAddField: null, userAlert: "Updating selected Staff by Field..." });

      const tokens = event.target.formGridTokens.value;
      console.log(parseInt(tokens));

      const requestBody = {
        query:`
        mutation {addUserTokens(activityId:"${activityId}", userId:"${activityId}",userInput:{tokens:${tokens}})
        {_id,name,dob,role,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description,imageLink},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
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
          this.context.user = resData.data.addUserTokens;

          const responseAlert = JSON.stringify(resData.data).slice(2,25);
          this.setState({ userAlert: responseAlert, user: resData.data.addUserTokens})
          this.getThisUser();
        })
        .catch(err => {
          this.setState({userAlert: err});
        });
    };


    addUserComplaintHandler = (event) => {
      const token = this.context.token;
      const activityId = this.context.activityId;

      this.setState({ adding: false, userAddField: null, userAlert: "Updating selected Staff by Field..." });

      const userId = this.context.selectedUser._id;
      const complaintDate = new Date();
      const complaintType = event.target.formGridTypeSelect.value;
      const complaintDescription = event.target.formGridDescription.value;

      const requestBody = {
        query:`
        mutation {addUserComplaint(activityId:"${activityId}", userId:"${userId}"complainantId:"${activityId}",userInput:{
          complaintDate:"${complaintDate}",
          complaintType:"${complaintType}",
          complaintDescription:"${complaintDescription}",
        })
        {_id,name,dob,role,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description,imageLink},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
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
          this.setState({ userAlert: responseAlert, user: resData.data.addUserComplaint})
          this.context.user = this.state.user;
          // this.getThisUser();
        })
        .catch(err => {
          this.setState({userAlert: err});
        });
    };


  deleteUserProfileImage = (event) => {

    const token = this.context.token;
    const activityId = this.context.activityId;

    const profileImageName = event.name;
    const profileImageType = event.type;
    const profileImagePath = event.path;
    console.log(profileImageName,profileImageType,profileImagePath);

    const requestBody = {
      query:`
        mutation {deleteUserProfileImage(activityId:"${activityId}",userId:"${activityId}",
        userInput:{
          profileImageName:"${profileImageName}",
          profileImageType:"${profileImageType}",
          profileImagePath:"${profileImagePath}",
        })
        {_id,name,dob,role,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description,imageLink},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
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
        console.log("here",resData.data.deleteUserProfileImage);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, user: resData.data.deleteUserProfileImage})
        this.context.user = this.state.user;
        // this.getThisUser();
      })
      .catch(err => {
        this.setState({userAlert: err});
      });
  }

  deleteUserPerk = (event) => {

    const token = this.context.token;
    const activityId = this.context.activityId;

    const perkDate = event.date;
    const perkName = event.name;
    const perkDescription = event.description;
    const perkImageLink = event.imageLink;
    console.log(perkDate,perkName,perkDescription);

    const requestBody = {
      query:`
        mutation {deleteUserPerk(activityId:"${activityId}",userId:"${activityId}",
        userInput:{
          perkDate:${perkDate},
          perkName:${perkName},
          perkDescription:${perkDescription},
          perkImageLink:${perkImageLink},
        })
        {_id,name,dob,role,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description,imageLink},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
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
        console.log("here",resData.data.deleteUserProfileImage);
        const responseAlert = JSON.stringify(resData.data).slice(2,25);
        this.setState({ userAlert: responseAlert, user: resData.data.deleteUserProfileImage})
        this.context.user = this.state.user;
        // this.getThisUser();
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
      {_id,name,dob,role,username,contact{email,phone},address{number,street,town,city,country,postalCode},bio,profileImages{name,type,path},interests,perks{date,name,description,imageLink},models{_id,name,username,contact{email}},tokens,tags,loggedin,viewedShows{_id},viewedContent{_id},likedContent{_id},searches{date,query},comments{_id,date,time,content{_id}},messages{_id,message,sender{role,ref},receiver{ref}},transactions{_id,date,time},billing{date,type,description,amount,paid,payment},complaints{date,type,description,complainant{_id,name}}}}
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

          if (thisUser.name === "Lord-of-the-Manor"){
            console.log("Welcome back my Mi'Lord...");
            this.setState({canDelete: true})
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
    this.setState({ updating: false, updatingField: false, adding: false, userAddField: null  });
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

  addUserField = (args) => {
    this.setState({adding: true, userAddField: args})
  }
  addUserProfileImage = () => {
    this.setState({adding: true, userAddField: "profileImage"})
    console.log(JSON.stringify(this.state));
  }
  addUserPerk = () => {
    this.setState({adding: true, userAddField: "perk"})
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
        <Col md={2} className="MasterCol1">
        <SidebarPage
          you={this.state.user}
        />
        </Col>
      )}

      <Col md={this.state.mCol2Size} className="MasterCol2">
        <div className="containerProfile">

        <Tab.Container id="left-tabs-example" defaultActiveKey="Detail">
          <Row>
            <Col sm={2}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="Detail">You</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="disabled" disabled>Add:</Nav.Link>
                </Nav.Item>

                <Nav.Item>
                  <Nav.Link eventKey="Perks">...</Nav.Link>
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
                        onEdit={this.modalConfirmUpdateHandler}
                        onEditField={this.modalConfirmUpdateFieldHandler}
                        addProfileImage={this.addUserProfileImageHandler}
                        addPerk={this.addUserPerkHandler}
                        onProfileImageDelete={this.deleteUserProfileImage}
                        onPerkDelete={this.deleteUserPerk}
                        onCancel={this.modalCancelHandler}
                        onStartUpdate={this.startUpdateUserHandler}
                        onStartUpdateField={this.startUpdateUserFieldHandler}
                        onStartAddProfileImage={this.addUserProfileImage}
                        onStartAddPerk={this.addUserPerk}
                        updating={this.state.updating}
                        updatingField={this.state.updatingField}
                        userAddField={this.state.userAddField}
                      />
                    )}



                </Tab.Pane>

                <Tab.Pane eventKey="Perks">
                  {this.state.user !== null && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.addUserField.bind(this, "perk")}>Add Perk</Button>
                  )}

                  {this.state.userAddField === "perk" &&
                    this.state.user !== null && (
                      <AddUserPerkForm
                        authId={this.context.activityId}
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.addUserPerkHandler}
                        confirmText="Confirm"
                        user={this.state.user}
                      />
                  )}

                  {this.state.user !== null && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.addUserField.bind(this, "interests")}>Add Interests</Button>
                  )}

                  {this.state.userAddField === "interests" &&
                    this.state.user !== null && (
                      <AddUserInterestsForm
                        authId={this.context.activityId}
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.addUserInterestsHandler}
                        confirmText="Confirm"
                        user={this.state.user}
                      />
                  )}

                  {this.state.user !== null && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.addUserField.bind(this, "tags")}>Add Tags</Button>
                  )}

                  {this.state.userAddField === "tags" &&
                    this.state.user !== null && (
                      <AddUserTagsForm
                        authId={this.context.activityId}
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.addUserTagsHandler}
                        confirmText="Confirm"
                        user={this.state.user}
                      />
                  )}

                  {this.state.user !== null && (
                    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.addUserField.bind(this, "tokens")}>Add Tokens</Button>
                  )}

                  {this.state.userAddField === "tokens" &&
                    this.state.user !== null && (
                      <AddUserTokensForm
                        authId={this.context.activityId}
                        canCancel
                        canConfirm
                        onCancel={this.modalCancelHandler}
                        onConfirm={this.addUserTokensHandler}
                        confirmText="Confirm"
                        user={this.state.user}
                      />
                  )}

                  {
                  //   {this.state.user !== null && (
                  //   <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={this.addUserField.bind(this, "complaint")}>Add Complaint</Button>
                  // )}
                  //
                  // {this.state.userAddField === "complaint" &&
                  //   this.state.user !== null && (
                  //     <AddUserComplaintForm
                  //       authId={this.context.activityId}
                  //       canCancel
                  //       canConfirm
                  //       onCancel={this.modalCancelHandler}
                  //       onConfirm={this.addUserComplaintHandler}
                  //       confirmText="Confirm"
                  //       user={this.state.user}
                  //     />
                  // )}
                }

                </Tab.Pane>

              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
        </div>
      </Col>
      </Row>
      </React.Fragment>
    );
  }
}

export default UserProfile;
