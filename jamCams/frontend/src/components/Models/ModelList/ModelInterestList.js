import React from 'react';

import ModelInterestItem from './ModelItem/ModelInterestItem';
import './ModelList.css';

const modelInterestList = props => {
  const modelInterests = props.modelInterests.map(interest => {

    return (
      <ModelInterestItem
        key={interest}
        authId={props.authId}
        interest={interest}
        onDelete={props.onDelete}
        canDelete={props.canDelete}
      />
    );
  });

  return <ul className="user__list1_detail">{modelInterests}</ul>;
};

export default modelInterestList;
