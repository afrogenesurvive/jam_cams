import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

import './ModelItem.css';

const modelMessgeItem = props => (
  <li key={props.authId} className="users__list-item_detail users__list-item_detail3">
    <div>

    <Card className="card">
      <Card.Body>
        <Card.Title>
          Message
        </Card.Title>


        <ul className="cardUl">
          <li className="cardLi">
          <p className="userItemHeading"> date:</p>
          <p className="userItemText">
          {props.date}
          </p>
          </li>
          <li>
          <p className="userItemHeading"> sender:</p>
          <p className="userItemText">
          {props.sender}
          </p>
          </li>
          <li>
          <p className="userItemHeading"> reciever:</p>
          <p className="userItemText">
          {props.receiver}
          </p>
          </li>
          <li>
          <p className="userItemHeading"> time:</p>
          <p className="userItemText">
          {props.time}
          </p>
          </li>
          <li>
          <p className="userItemHeading"> subject:</p>
          <p className="userItemText">
          {props.subject}
          </p>
          </li>
          <li>
          <p className="userItemHeading"> message:</p>
          <p className="userItemText">
          {props.message}
          </p>
          </li>
        </ul>

        <Card.Link href="">
        { props.canDelete === true && (
          <Button variant="danger" onClick={props.onDelete.bind(this, props._id)}>
            Delete
          </Button>
        )}
        </Card.Link>
      </Card.Body>
    </Card>
    </div>

  </li>
);

export default modelMessgeItem;
