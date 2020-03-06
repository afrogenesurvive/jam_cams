import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
// import Accordion from 'react-bootstrap/Accordion';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import AuthContext from '../../context/auth-context';

import './UserDetail.css';

const UserDetail = (props) => {

  const {...user} = props.user;

  let userDob = new Date(user.dob.substr(0,9) * 1000).toISOString().slice(0,10);

  return (
    <div className={"UserDetailBox1"}>

    <Tabs defaultActiveKey="Demographics" id="uncontrolled-tab-example" className="tab">

      <Tab eventKey="Demographics" title="Demographics">
      <Card className="UserDetailCard">
      <Card.Body>
        <Card.Title><span className="ul">User Details</span></Card.Title>
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
            <span className="bold">Bio:</span> {user.bio}
          </Card.Text>
          <Card.Text>
            <span className="bold">Tokens :</span> {user.tokens}
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

export default UserDetail;
