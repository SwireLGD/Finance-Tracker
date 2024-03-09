import React from 'react';
import { Transaction } from '../../types';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  return (
    <li>
      <p>{transaction.createdAt} - </p>
      <p>{transaction.category}: </p>
      <p>{transaction.amount}</p>
    </li>
  );
};

export default TransactionItem;
