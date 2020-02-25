import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'
import './UserItem.css';

const userAttendanceItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>

    <Card className="card">
      <Card.Body>
        <Card.Title>
          Attendance
        </Card.Title>

        
        <ul className="cardUl">
          <li className="cardLi">
          <p className="userItemHeading"> Date:</p>
          <p className="userItemText">
          {props.date}
          </p>
          </li>
          <li>
          <p className="userItemHeading"> Status:</p>
          <p className="userItemText">
          {props.status}
          </p>
          </li>
          <li>
          <p className="userItemHeading"> Description:</p>
          <p className="userItemText">
          {props.description}
          </p>
          </li>
        </ul>
        
        <Card.Link href="">
        { props.canDelete === true && (
          <Button variant="danger" onClick={props.onDelete.bind(this, props.attendance)}>
            Delete
          </Button>
        )}
        </Card.Link>
      </Card.Body>
    </Card>
    </div>
  </li>
);

export default userAttendanceItem;
