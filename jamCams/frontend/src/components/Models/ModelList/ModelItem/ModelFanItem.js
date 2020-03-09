import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './ModelItem.css';

const modelFanItem = props => (
  <li key={props.userId} className="users__list-item_detail users__list-item_detail4">
    <Card style={{ width: '18rem' }}>

    <Card.Body>
      <Card.Title>{props.username}</Card.Title>
      <Card.Img variant="top" src={props.topImage} />
      <Card.Text>
        Bio: {props.bio}
      </Card.Text>
      {props.canDelete === true && (
        <Button variant="warning" onClick={props.onDelete.bind(this, props._id)}>
          Delete
        </Button>
      )}

    </Card.Body>
    </Card>

  </li>
);

export default modelFanItem;
