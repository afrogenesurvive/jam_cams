import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import UserProfileImageList from './UserList/UserProfileImageList';
import UserPerkList from './UserList/UserPerkList';
import UserInterestList from './UserList/UserInterestList';
import UserTagList from './UserList/UserTagList';
import UserBillingList from './UserList/UserBillingList';
import UserComplaintList from './UserList/UserComplaintList';

import UpdateUserForm from '../Forms/user/UpdateUserForm';
import UpdateUserFieldForm from '../Forms/user/UpdateUserFieldForm';
import AddUserProfileImageForm from '../Forms/user/AddUserProfileImageForm';
import AddUserPerkForm from '../Forms/user/AddUserPerkForm';

import './thisUserProfile.css';

const thisUserProfile = (props) => {
  const {...user} = props.user;
  const authId = props.authId;
  const userAddress = user.address;

  const userDob = new Date(user.dob.substr(0,9)*1000).toISOString().slice(0,10);

  return (

  <Tabs defaultActiveKey="Demographics" id="uncontrolled-tab-example">
    <Tab eventKey="" title="Details:" disabled>
    </Tab>
    <Tab eventKey="Demographics" title="Demographics">
    <Card className="UserDetailCard">
    <Card.Body>
      <Card.Title><span className="ul">Your Profile Details</span></Card.Title>
      <Row className="detailCardRow">
        <Col className="detailCardCol">
          <Card.Text>
            <span className="bold">ID:</span> {user._id}
          </Card.Text>
          <Card.Text>
            <span className="bold">Name:</span> {user.name}
          </Card.Text>
          <Card.Text>
            <span className="bold">Username:</span> {user.username}
          </Card.Text>
          <Card.Text>
            <span className="bold">D.O.B:</span> {userDob}
          </Card.Text>
          <Card.Text>
            <span className="bold">Phone:</span> {user.contact.phone}
          </Card.Text>
          <Card.Text>
            <span className="bold">Email:</span> {user.contact.email}
          </Card.Text>
        </Col>

        <Col className="detailCardCol">
          <Card.Text>
            <span className="bold">Bio:</span> {user.bio}
          </Card.Text>
          <Card.Text>
            <span className="bold">Address:</span>
          </Card.Text>
          <Card.Text>
            <span className="bold">Street & Number :</span> {userAddress.number}, {userAddress.street}
          </Card.Text>
          <Card.Text>
            <span className="bold">Town :</span> {userAddress.town}
          </Card.Text>
          <Card.Text>
            <span className="bold">City :</span> {userAddress.city}
          </Card.Text>
          <Card.Text>
            <span className="bold">Country :</span> {userAddress.country}
          </Card.Text>
          <Card.Text>
            <span className="bold">Postal Code :</span> {userAddress.postalCode}
          </Card.Text>
          <Card.Text>
            <span className="bold">Tokens :</span> {user.tokens}
          </Card.Text>
        </Col>
      </Row>

      <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartUpdate}>Edit</Button>
      <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartUpdateField}>Edit 1 Field</Button>

      {props.updating === true &&(
        <UpdateUserForm
        canCancelProfile
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.onEdit}
          confirmText="Confirm"
          user={props.user}
          authId={props.authId}
        />
      )}

      {props.updatingField === true && (
          <UpdateUserFieldForm
            canCancel
            canConfirm
            onCancel={props.onCancel}
            onConfirm={props.onEditField}
            confirmText="Confirm"
            user={props.user}
            authId={props.authId}
          />
      )}
    </Card.Body>
    </Card>
    </Tab>

    <Tab eventKey="profileImages" title="profileImages">

    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddProfileImage}>Add Image</Button>
    {props.userAddField === "profileImage" && (
        <AddUserProfileImageForm
          user={props.user}
          authId={props.authId}
          canCancel
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.addProfileImage}
          confirmText="Confirm"
        />
    )}

    {user.profileImages !== null &&
      user.profileImages !== [] && (
        <UserProfileImageList
          userProfileImages={user.profileImages}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.onProfileImageDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="perks" title="perks">
    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddPerk}>Add Perk</Button>

    {props.userAddField === "perk" && (
        <AddUserPerkForm
          canCancel
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.addPerk}
          confirmText="Confirm"
          user={props.user}
          authId={props.authId}
        />
    )}

    {user.perks !== null &&
      user.perks !== [] && (
        <UserPerkList
          userPerks={user.perks}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.onPerkDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="interests" title="interests">

    {user.interests !== null &&
      user.interests !== [] && (
        <UserInterestList
          userInterests={user.interests}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.attendanceDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="tags" title="tags">

    {user.tags !== null &&
      user.tags !== [] && (
        <UserTagList
          userTags={user.tags}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.attendanceDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="billing" title="billing">

    {user.billing !== null &&
      user.billing !== [] && (
        <UserBillingList
          userBilling={user.billing}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.attendanceDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="complaints" title="complaints">

    {user.complaints !== null &&
      user.complaints !== [] && (
        <UserComplaintList
          userComplaints={user.complaints}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.attendanceDelete}
        />
      ) }

    </Tab>
  </Tabs>
  );
}

export default thisUserProfile;
