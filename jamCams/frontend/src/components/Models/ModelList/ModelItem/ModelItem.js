import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './ModelItem.css';

const modelItem = props => (
  <li key={props.userId} className="users__list-item_detail users__list-item_detail4">
    <Card style={{ width: '18rem' }}>

    <Card.Body>
      <Card.Title>{props.username}</Card.Title>
      <Card.Img variant="top" src={props.topImage} />
      <Card.Text>
        Bio: {props.bio}
      </Card.Text>
      <Card.Text>
        Interests: {props.interest1}, {props.interest2}, {props.interest3}
      </Card.Text>
      <Button variant="primary" onClick={props.onDetail.bind(this, props._id)}>
        Details
      </Button>
      <Button variant="secondary" onClick={props.onSelectNoDetail.bind(this, props.model)}>
        Select
      </Button>
    </Card.Body>
    </Card>

  </li>
);

export default modelItem;
