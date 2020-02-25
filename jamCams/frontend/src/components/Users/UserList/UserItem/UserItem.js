import React from 'react';
import Button from 'react-bootstrap/Button';

import './UserItem.css';

const userItem = props => (
  <li key={props.userId} className="users__list-item_master">
    <div>
      <h5 className="userItemHeading"> Name:</h5>
      <p className="userItemText">
        {props.name}
      </p>
      <h5 className="userItemHeading"> Role:</h5>
      <p className="userItemText">
        {props.role}
      </p>
    </div>
    <div>
    <Button variant="primary" onClick={props.onDetail.bind(this, props._id)}>
          Details
        </Button>
    </div>
  </li>
);

export default userItem;
