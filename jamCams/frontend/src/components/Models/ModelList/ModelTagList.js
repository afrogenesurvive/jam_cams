import React from 'react';

import ModelTagItem from './ModelItem/ModelTagItem';
import './ModelList.css';

const modelTagList = props => {
  const modelTags = props.modelTags.map(tag => {

    return (
      <ModelTagItem
        key={tag}
        authId={props.authId}
        tag={tag}
        onDelete={props.onDelete}
        canDelete={props.canDelete}
      />
    );
  });

  return <ul className="user__list1_detail">{modelTags}</ul>;
};

export default modelTagList;
