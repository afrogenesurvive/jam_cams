import React from 'react';
// import Accordion from 'react-bootstrap/Accordion';
// import Button from 'react-bootstrap/Button';

import SearchModelItem from './ModelItem/SearchModelItem';
import './ModelList.css';

const searchModelList = props => {

  const searchModels = props.searchModels.map(model => {
    return (
      <React.Fragment>
      <SearchModelItem
        key={model._id}
        userId={props.authUserId}
        _id={model._id}
        name={model.name}
        onDetail={props.onViewDetail}
      />
      </React.Fragment>
    );
  });
  return <ul className="user__list1_master">{searchModels}</ul>;
};

export default searchModelList;
