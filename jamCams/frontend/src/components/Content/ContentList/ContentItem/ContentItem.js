import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './ContentItem.css';

const contentItem = props => (
  <li key={props.authId} className="users__list-item_detail users__list-item_detail4">
    <Card style={{ width: '18rem' }}>

    <Card.Body>
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>
        Type: {props.Type}
      </Card.Text>
      <Card.Title>{props.file.name}</Card.Title>
      <Card.Img variant="top" src={props.file.path} />

      {props.creator !== null && (
        <Card.Text>
          Creator: {props.creator.username}
        </Card.Text>
      )}
      <Button variant="primary" onClick={props.onDetail.bind(this, props._id)}>
        Details
      </Button>
      <Button variant="secondary" onClick={props.onSelectNoDetail.bind(this, props.content)}>
        Select
      </Button>

    </Card.Body>
    </Card>

  </li>
);

export default contentItem;
