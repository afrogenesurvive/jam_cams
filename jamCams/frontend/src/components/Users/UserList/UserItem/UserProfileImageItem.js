import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';

import './UserItem.css';

const userProfileImageItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>

    <Card className="card">
      <Card.Body>
        <Card.Title>
          ProfileImage
        </Card.Title>


        <ul className="cardUl">
          <li>
          <Image src={props.path} fluid />

          </li>
          <li className="cardLi">
          <p className="userItemHeading"> Name:</p>
          <p className="userItemText">
          {props.name}
          </p>
          </li>
        </ul>

        <Card.Link href="">
        { props.canDelete === true && (
          <Button variant="danger" onClick={props.onDelete.bind(this, props.profileImage)}>
            Delete
          </Button>
        )}
        </Card.Link>
      </Card.Body>
    </Card>
    </div>

  </li>
);

export default userProfileImageItem;
