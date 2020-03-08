import React from 'react';

import ModelPerkItem from './ModelItem/ModelPerkItem';
import './ModelList.css';

const modelPerkList = props => {
  const modelPerks = props.modelPerks.map(perk => {

    let perkDate = 0;
    if (perk.date !== null && perk.date !== "") {
      perkDate = new Date (perk.date.substr(0,10)*1000).toISOString().slice(0,10);
    }

    return (
      <ModelPerkItem
        key={perk.description}
        authId={props.authId}
        name={perk.name}
        date={perkDate}
        description={perk.description}
        imageLink={perk.imageLink}
        perk={perk}
        onDelete={props.onDelete}
        canDelete={props.canDelete}
      />
    );
  });

  return <ul className="user__list1_detail">{modelPerks}</ul>;
};

export default modelPerkList;
