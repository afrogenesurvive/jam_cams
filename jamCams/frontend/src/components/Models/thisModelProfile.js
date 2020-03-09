import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ModelProfileImageList from './ModelList/ModelProfileImageList';
import ModelSocialMediaList from './ModelList/ModelSocialMediaList';
import ModelPerkList from './ModelList/ModelPerkList';
import ModelTraitList from './ModelList/ModelTraitList';
import ModelModelNameList from './ModelList/ModelModelNameList';
import ModelInterestList from './ModelList/ModelInterestList';
import ModelCategoryList from './ModelList/ModelCategoryList';
import ModelTagList from './ModelList/ModelTagList';
import ModelFanList from './ModelList/ModelFanList';

import UpdateModelForm from '../../components/Forms/model/UpdateModelForm';
import UpdateModelFieldForm from '../../components/Forms/model/UpdateModelFieldForm';
import AddModelProfileImageForm from '../../components/Forms/model/AddModelProfileImageForm';
import AddModelSocialMediaForm from '../../components/Forms/model/AddModelSocialMediaForm';
import AddModelModelNameForm from '../../components/Forms/model/AddModelModelNameForm';
import AddModelPerkForm from '../../components/Forms/model/AddModelPerkForm';
import AddModelTraitForm from '../../components/Forms/model/AddModelTraitForm';
import AddModelInterestsForm from '../../components/Forms/model/AddModelInterestsForm';
import AddModelCategoriesForm from '../../components/Forms/model/AddModelCategoriesForm';
import AddModelTagsForm from '../../components/Forms/model/AddModelTagsForm';
import AddModelTokensForm from '../../components/Forms/model/AddModelTokensForm';

import CreateContentForm from '../../components/Forms/content/CreateContentForm';

import './thisUserProfile.css';

const thisModelProfile = (props) => {
  const {...model} = props.model;
  const modelAddress = model.address;
  const modelDob = new Date(model.dob.substr(0,10)*1000).toISOString().slice(0,10);

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
            <span className="bold">ID:</span> {model._id}
          </Card.Text>
          <Card.Text>
            <span className="bold">Name:</span> {model.name}
          </Card.Text>
          <Card.Text>
            <span className="bold">Username:</span> {model.username}
          </Card.Text>
          <Card.Text>
            <span className="bold">D.O.B:</span> {modelDob}
          </Card.Text>
          <Card.Text>
            <span className="bold">Phone:</span> {model.contact.phone}
          </Card.Text>
          <Card.Text>
            <span className="bold">Email:</span> {model.contact.email}
          </Card.Text>
        </Col>

        <Col className="detailCardCol">
          <Card.Text>
            <span className="bold">Bio:</span> {model.bio}
          </Card.Text>
          <Card.Text>
            <span className="bold">Address:</span>
          </Card.Text>
          <Card.Text>
            <span className="bold">Street & Number :</span> {modelAddress.number}, {modelAddress.street}
          </Card.Text>
          <Card.Text>
            <span className="bold">Town :</span> {modelAddress.town}
          </Card.Text>
          <Card.Text>
            <span className="bold">City :</span> {modelAddress.city}
          </Card.Text>
          <Card.Text>
            <span className="bold">Country :</span> {modelAddress.country}
          </Card.Text>
          <Card.Text>
            <span className="bold">Postal Code :</span> {modelAddress.postalCode}
          </Card.Text>
          <Card.Text>
            <span className="bold">Tokens :</span> {model.tokens}
          </Card.Text>
        </Col>
      </Row>

      <ModelModelNameList
        modelModelNames={model.modelNames}
        authId={props.authId}
        canDelete={props.canDelete}
        onDelete={props.onModelNameDelete}
      />

      <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddModelName}>+ Modelname</Button>
      {props.modelAddField === "modelName" && (
          <AddModelModelNameForm
            canCancel
            canConfirm
            onCancel={props.onCancel}
            onConfirm={props.addModelName}
            confirmText="Confirm"
            model={props.model}
            authId={props.authId}
          />
      )}

      <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartUpdate}>Edit</Button>
      <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartUpdateField}>Edit 1 Field</Button>
      <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddTokens}>+ Tokens</Button>

      {props.updating === true &&(
        <UpdateModelForm
          canCancelProfile
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.onEdit}
          confirmText="Confirm"
          model={props.model}
          authId={props.authId}
        />
      )}

      {props.updatingField === true && (
          <UpdateModelFieldForm
            canCancel
            canConfirm
            onCancel={props.onCancel}
            onConfirm={props.onEditField}
            confirmText="Confirm"
            model={props.model}
            authId={props.authId}
          />
      )}

      {props.modelAddField === "tokens" && (
          <AddModelTokensForm
            canCancel
            canConfirm
            onCancel={props.onCancel}
            onConfirm={props.addTokens}
            confirmText="Confirm"
            model={props.model}
            authId={props.authId}
          />
      )}

    </Card.Body>
    </Card>
    </Tab>


    <Tab eventKey="profileImages" title="profileImages">

    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddProfileImage}>+ Image</Button>
    {props.modelAddField === "profileImage" && (
        <AddModelProfileImageForm
          model={props.model}
          authId={props.authId}
          canCancel
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.addProfileImage}
          confirmText="Confirm"
        />
    )}

    {model.profileImages !== null &&
      model.profileImages !== [] && (
        <ModelProfileImageList
          modelProfileImages={model.profileImages}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.onProfileImageDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="socialMedia" title="socialMedia">

    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddSocialMedia}>+ Social</Button>
    {props.modelAddField === "socialMedia" && (
        <AddModelSocialMediaForm
          model={props.model}
          authId={props.authId}
          canCancel
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.addSocialMedia}
          confirmText="Confirm"
        />
    )}

    {model.socialMedia !== null &&
      model.socialMedia !== [] && (
        <ModelSocialMediaList
          modelSocialMedias={model.socialMedia}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.onSocialMediaDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="perks" title="perks">
    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddPerk}>+ Perk</Button>

    {props.modelAddField === "perk" && (
        <AddModelPerkForm
          canCancel
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.addPerk}
          confirmText="Confirm"
          model={props.model}
          authId={props.authId}
        />
    )}

    {model.perks !== null &&
      model.perks !== [] && (
        <ModelPerkList
          modelPerks={model.perks}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.onPerkDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="traits" title="traits">
    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddTrait}>+ Trait</Button>

    {props.modelAddField === "trait" && (
        <AddModelTraitForm
          canCancel
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.addTrait}
          confirmText="Confirm"
          model={props.model}
          authId={props.authId}
        />
    )}

    {model.traits !== null &&
      model.traits !== [] && (
        <ModelTraitList
          modelTraits={model.traits}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.onTraitDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="interests" title="interests">

    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddInterests}>+ Interests</Button>

    {props.modelAddField === "interests" && (
        <AddModelInterestsForm
          canCancel
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.addInterests}
          confirmText="Confirm"
          model={props.model}
          authId={props.authId}
        />
    )}

    {model.interests !== null &&
      model.interests !== [] && (
        <ModelInterestList
          modelInterests={model.interests}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.onInterestDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="categories" title="categories">

    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddCategories}>+ Categories</Button>

    {props.modelAddField === "categories" && (
        <AddModelCategoriesForm
          canCancel
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.addCategories}
          confirmText="Confirm"
          model={props.model}
          authId={props.authId}
        />
    )}

    {model.categories !== null &&
      model.categories !== [] && (
        <ModelCategoryList
          modelCategories={model.categories}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.onCategoriesDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="tags" title="tags">

    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddTags}>+ Tags</Button>

    {props.modelAddField === "tags" && (
        <AddModelTagsForm
          canCancel
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.addTags}
          confirmText="Confirm"
          model={props.model}
          authId={props.authId}
        />
    )}

    {model.tags !== null &&
      model.tags !== [] && (
        <ModelTagList
          modelTags={model.tags}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.onTagsDelete}
        />
      ) }

    </Tab>

    <Tab eventKey="content" title="content">

    <Button variant="outline-primary" size="lg" className="confirmEditButton" onClick={props.onStartAddContent}>+ Content</Button>

    {props.modelAddField === "content" && (
        <CreateContentForm
          canCancel
          canConfirm
          onCancel={props.onCancel}
          onConfirm={props.addContent}
          confirmText="Confirm"
          model={props.model}
          authId={props.authId}
        />
    )}

    {
      // model.content !== null &&
      // model.content !== [] && (
      //   <ModelContentList
      //     modelContent={model.content}
      //     authId={props.authId}
      //     canDelete={props.canDelete}
      //     onDelete={props.onContentDelete}
      //   />
      // )
    }

    </Tab>

    <Tab eventKey="fans" title="fans">

    {model.fans !== null &&
      model.fans !== [] && (
        <ModelFanList
          modelFans={model.fans}
          authId={props.authId}
          canDelete={props.canDelete}
          onDelete={props.onModelFanDelete}
        />
      ) }

    </Tab>

  </Tabs>
  );
}

export default thisModelProfile;
