import React from 'react';

import UserMessageItem from './UserItem/UserMessageItem';
import './UserList.css';

const userMessageList = props => {
  const userMessages = props.userMessages.map(message => {
    return (
      <UserMessageItem
        key={message.path}
        authId={props.authId}
        _id={message._id}
        date={message.date}
        time={message.time}
        subject={message.subject}
        messageMessage={message.message}
        sender={message.sender}
        receiver={message.receiver}
        message={message}
        onDelete={props.onDelete}
        canDelete={props.canDelete}
      />
    );
  });

  return <ul className="user__list1_detail">{userMessages}</ul>;
};

export default userMessageList;
