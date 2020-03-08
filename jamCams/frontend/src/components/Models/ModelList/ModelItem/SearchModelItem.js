import React from 'react';
// import { NavLink } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './ModelItem.css';

const searchModelItem = props => (
  <li key={props.authId} className="users__list-item_master">
    <div>
      <p className="userItemHeading"> Name:</p>
      <p className="userItemText">
        {props.name}
      </p>
    </div>
    <div>
    <Button variant="primary" onClick={props.onDetail.bind(this, props._id)}>
          Details
        </Button>
    </div>
  </li>
);

export default searchModelItem;
