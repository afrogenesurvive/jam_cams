import React from 'react';

import ModelCategoryItem from './ModelItem/ModelCategoryItem';
import './ModelList.css';

const modelCategoryList = props => {
  const modelCategories = props.modelCategories.map(category => {

    return (
      <ModelCategoryItem
        key={category}
        authId={props.authId}
        category={category}
        onDelete={props.onDelete}
        canDelete={props.canDelete}
      />
    );
  });

  return <ul className="user__list1_detail">{modelCategories}</ul>;
};

export default modelCategoryList;
