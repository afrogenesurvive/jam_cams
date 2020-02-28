import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

import './UserItem.css';

const userLeaveItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>

    <Card className="card">
      <Card.Body>
        <Card.Title>
          Leave
        </Card.Title>

        
        <ul className="cardUl">
          <li className="cardLi">
          <p className="userItemHeading"> Type:</p>
          <p className="userItemText">
          {props.type}
          </p>
          </li>
          <li>
          <p className="userItemHeading"> Start Date:</p>
          <p className="userItemText">
          {props.startDate}
          </p>
          </li>
          <li>
          <p className="userItemHeading"> End Date:</p>
          <p className="userItemText">
          {props.endDate}
          </p>
          </li>
        </ul>
        
        <Card.Link href="">
        { props.canDelete === true && (
          <Button variant="danger" onClick={props.onDelete.bind(this, props.leave)}>
            Delete
          </Button>
        )}
        </Card.Link>
      </Card.Body>
    </Card>
    </div>

  </li>
);

export default userLeaveItem;
