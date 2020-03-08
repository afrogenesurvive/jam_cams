import React from 'react';

import ModelItem from './ModelItem/ModelItem';
import './ModelList.css';

const modelList = props => {

  const models = props.models.map(model => {
    return (
      <ModelItem
        key={model._id}
        authId={props.authId}
        _id={model._id}
        username={model.username}
        topImage={model.profileImages[0].path}
        bio={model.bio}
        interest1={model.interests[0]}
        interest2={model.interests[1]}
        interest3={model.interests[2]}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list1_master">{models}</ul>;
};

export default modelList;
