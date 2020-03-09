import React from 'react';

import ModelFanItem from './ModelItem/ModelFanItem';
import './ModelList.css';

const modelFanList = props => {

  const fans = props.modelFans.map(fan => {

    return (
      <ModelFanItem
        key={fan._id}
        authId={props.authId}
        _id={fan._id}
        fan={fan}
        username={fan.username}
        topImage={fan.profileImages[0].path}
        bio={fan.bio}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
      />
    );
  });

  return <ul className="user__list1_master">{fans}</ul>;
};

export default modelFanList;
