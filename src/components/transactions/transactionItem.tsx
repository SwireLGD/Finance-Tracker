import React from 'react';
import { Transaction } from '../../types';
import { useAppSelector } from '../../app/hooks';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const categories = useAppSelector(state => state.category.items);
  const category = categories.find(c => c.id === transaction.category);

  return (
    <li>
      <p>{transaction.createdAt} - </p>
      <p>{category ? category.name : 'category doesnt exist'}</p>
      <p>{transaction.amount}</p>
    </li>
  );
};

export default TransactionItem;
