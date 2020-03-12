import React from 'react';

import ModelTransactionItem from './ModelItem/ModelTransactionItem';
import './ModelList.css';

const modelTransactionList = props => {
  const modelTransactions = props.modelTransactions.map(transaction => {

    return (
      <ModelTransactionItem
        key={transaction.path}
        authId={props.authId}
        _id={transaction._id}
        date={transaction.date}
        time={transaction.time}
        description={transaction.description}
        amount={transaction.amount}
        sender={transaction.sender}
        receiver={transaction.receiver}
        transaction={transaction}
        onDelete={props.onDelete}
        canDelete={props.canDelete}
      />
    );
  });

  return <ul className="user__list1_detail">{modelTransactions}</ul>;
};

export default modelTransactionList;
