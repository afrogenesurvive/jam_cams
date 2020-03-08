import React from 'react';

import ModelSocialMediaItem from './ModelItem/ModelSocialMediaItem';
import './ModelList.css';

const modelSocialMediaList = props => {
  const modelSocialMedias = props.modelSocialMedias.map(socialMedia => {

    return (
      <ModelSocialMediaItem
        key={socialMedia.path}
        authId={props.authId}
        name={socialMedia.name}
        type={socialMedia.type}
        path={socialMedia.path}
        socialMedia={socialMedia}
        onDelete={props.onDelete}
        canDelete={props.canDelete}
      />
    );
  });

  return <ul className="user__list1_detail">{modelSocialMedias}</ul>;
};

export default modelSocialMediaList;
