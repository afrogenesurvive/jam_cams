import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

import './UserItem.css';

const userInterestItem = props => (
  <li key={props.userId} className="users__list-item_detail">
    <div>

    <Card className="card">
      <Card.Body>
        <Card.Title>
          {props.interest}
        </Card.Title>

        <Card.Link href="">
        { props.canDelete === true && (
          <Button variant="danger" onClick={props.onDelete.bind(this, props.interest)}>
            Delete
          </Button>
        )}
        </Card.Link>
      </Card.Body>
    </Card>
    </div>

  </li>
);

export default userInterestItem;
