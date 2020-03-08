import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import './ModelItem.css';

const modelTraitItem = props => (
  <li key={props.authId} className="users__list-item_detail1 users__list-item_detail">
    <div>

    <Card className="card">
      <Card.Body>

        <ul className="cardUl">
          <li className="cardLi">

          <p className="userItemHeading"> key:</p>
          <p className="userItemText">
          {props.key}
          </p>
          </li>
          <li>
          <p className="userItemHeading"> value:</p>
          <p className="userItemText">
          {props.value}
          </p>
          </li>
        </ul>

        <Card.Link href="">
        { props.canDelete === true && (
          <Button variant="danger" onClick={props.onDelete.bind(this, props.trait)}>
            Delete
          </Button>
        )}
        </Card.Link>
      </Card.Body>
    </Card>
    </div>

  </li>
);

export default modelTraitItem;
