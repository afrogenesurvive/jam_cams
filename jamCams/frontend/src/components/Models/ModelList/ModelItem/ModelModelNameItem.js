import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

import './ModelItem.css';

const userModelNameItem = props => (
  <li key={props.authId} className="users__list-item_detail2 users__list-item_detail">
    <div className="tag_card_body">

    <Card className="card">
      <Card.Body>
        <Card.Text>
          {props.modelName}
        </Card.Text>

        <Card.Link href="">
        { props.canDelete === true && (
          <Button variant="danger" onClick={props.onDelete.bind(this, props.modelName)}>
            Delete
          </Button>
        )}
        </Card.Link>
      </Card.Body>
    </Card>
    </div>

  </li>
);

export default userModelNameItem;
