import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import AuthContext from '../../context/auth-context';

import './UserDetail.css';

const ModelDetail = (props) => {

  const {...model} = props.model;
  const profileImages = model.profileImages;
  const interests = model.interests;
  const perks = model.perks;
  const tags = model.tags;

  let modelDob = new Date(model.dob.substr(0,9) * 1000).toISOString().slice(0,10);

  return (
    <div className={"UserDetailBox1"}>

    <Tabs defaultActiveKey="Demographics" id="uncontrolled-tab-example" className="tab">

      <Tab eventKey="Demographics" title="Demographics">
      <Card className="UserDetailCard">
      <Card.Body>
        <Card.Title><span className="ul">Model Details</span></Card.Title>
        <Row className="detailCardRow">
          <Col className="detailCardCol">
          <Card.Img variant="top" src={model.profileImages[0]} />
          <Card.Text>
            <span className="bold">ID:</span> {model._id}
          </Card.Text>
          <Card.Text>
            <span className="bold">Username:</span> {model.username}
          </Card.Text>
          <Card.Text>
            <span className="bold">Country:</span> {model.address.country}
          </Card.Text>
          <Card.Text>
            <span className="bold">Bio:</span> {model.bio}
          </Card.Text>
          <Card.Text>
            <span className="bold">Tokens :</span> {model.tokens}
          </Card.Text>
          </Col>

          <Col className="detailCardCol">



          </Col>
        </Row>

        <Row className="detailCardRow">
          <Col className="detailCardCol">
            { props.canDelete === true && (
              <Button variant="danger" onClick={props.onDelete}>
                Delete !!??
              </Button>
            )}
          </Col>
        </Row>

      </Card.Body>
      </Card>
      </Tab>

    </Tabs>

    </div>

  );
}

export default ModelDetail;
