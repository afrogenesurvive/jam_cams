import React from 'react';

import ModelModelNameItem from './ModelItem/ModelModelNameItem';
import './ModelList.css';

const modelModelNameList = props => {
  const modelModelNames = props.modelModelNames.map(modelName => {

    return (
      <ModelModelNameItem
        key={modelName}
        authId={props.authId}
        modelName={modelName}
        onDelete={props.onDelete}
        canDelete={props.canDelete}
      />
    );
  });

  return <ul className="user__list1_detail">{modelModelNames}</ul>;
};

export default modelModelNameList;
