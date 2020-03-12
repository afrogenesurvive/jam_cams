import React from 'react';

import ModelMessageItem from './ModelItem/ModelMessageItem';
import './ModelList.css';

const modelMessageList = props => {
  const modelMessages = props.modelMessages.map(message => {

    return (
      <ModelMessageItem
        key={message.path}
        authId={props.authId}
        _id={message._id}
        date={message.date}
        time={message.time}
        subject={message.subject}
        message={message.message}
        sender={message.sender}
        reciever={message.reciever}
        message={message}
        onDelete={props.onDelete}
        canDelete={props.canDelete}
      />
    );
  });

  return <ul className="user__list1_detail">{modelMessages}</ul>;
};

export default modelMessageList;
