import React from 'react';

import UserItem from './UserItem/UserItem';
import './UserList.css';

const userList = props => {

  const users = props.users.map(user => {
    return (
      <UserItem
        key={user._id}
        userId={props.authUserId}
        _id={user._id}
        name={user.name}
        email={user.email}
        role={user.role}
        onDetail={props.onViewDetail}
      />
    );
  });

  return <ul className="user__list1_master">{users}</ul>;
};

export default userList;
