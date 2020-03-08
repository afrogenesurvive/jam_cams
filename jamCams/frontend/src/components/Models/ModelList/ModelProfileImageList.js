import React from 'react';

import ModelProfileImageItem from './ModelItem/ModelProfileImageItem';
import './ModelList.css';

const modelProfileImageList = props => {
  const modelProfileImages = props.modelProfileImages.map(profileImage => {

    return (
      <ModelProfileImageItem
        key={profileImage.path}
        authId={props.authId}
        name={profileImage.name}
        type={profileImage.type}
        path={profileImage.path}
        profileImage={profileImage}
        onDelete={props.onDelete}
        canDelete={props.canDelete}
      />
    );
  });

  return <ul className="user__list1_detail">{modelProfileImages}</ul>;
};

export default modelProfileImageList;
