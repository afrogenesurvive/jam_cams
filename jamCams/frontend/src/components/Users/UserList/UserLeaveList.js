import React from 'react';

import UserLeaveItem from './UserItem/UserLeaveItem';
import './UserList.css';

const userLeaveList = props => {
  const userLeave = props.userLeave.map(leave => {
    const userLeaveStartDate = new Date (leave.startDate.substr(0,10)*1000).toISOString().slice(0,10);
    const userLeaveEndDate = new Date (leave.endDate.substr(0,10)*1000).toISOString().slice(0,10);
    return (
      <UserLeaveItem
        key={leave.type}
        userId={props.authUserId}
        type={leave.type}
        startDate={userLeaveStartDate}
        endDate={userLeaveEndDate}
        description={leave.description}
        canDelete={props.canDelete}
        onDelete={props.onDelete}
        leave={leave}
      />
    );
  });

  return <ul className="user__list1_detail">{userLeave}</ul>;
};

export default userLeaveList;
