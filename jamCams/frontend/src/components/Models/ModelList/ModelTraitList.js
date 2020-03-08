import React from 'react';

import ModelTraitItem from './ModelItem/ModelTraitItem';
import './ModelList.css';

const modelTraitList = props => {
  const modelTraits = props.modelTraits.map(trait => {

    return (
      <ModelTraitItem
        key={trait.description}
        authId={props.authId}
        key={trait.key}
        value={trait.value}
        trait={trait}
        onDelete={props.onDelete}
        canDelete={props.canDelete}
      />
    );
  });

  return <ul className="user__list1_detail">{modelTraits}</ul>;
};

export default modelTraitList;
