import React from 'react';

import UserTagItem from './UserItem/UserTagItem';
import './UserList.css';

const userTagList = props => {
  const userTags = props.userTags.map(tag => {

    return (
      <UserTagItem
        key={tag}
        authId={props.authId}
        tag={tag}
      />
    );
  });

  return <ul className="user__list1_detail">{userTags}</ul>;
};

export default userTagList;
