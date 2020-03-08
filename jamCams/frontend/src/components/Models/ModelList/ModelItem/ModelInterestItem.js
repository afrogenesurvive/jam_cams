import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

import './ModelItem.css';

const userInterestItem = props => (
  <li key={props.userId} className="users__list-item_detail2 users__list-item_detail">
    <div className="tag_card_body">

    <Card className="card">
      <Card.Body>
        <Card.Text>
          {props.interest}
        </Card.Text>

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
