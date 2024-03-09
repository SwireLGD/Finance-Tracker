import React, { useEffect } from 'react';
import { Transaction } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import dayjs from 'dayjs';
import { deleteTransaction } from '../../store/transactionThunks';

interface TransactionItemProps {
  transaction: Transaction;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction }) => {
  const categories = useAppSelector(state => state.category.items);
  const category = categories.find(c => c.id === transaction.category);
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this transaction?');
    if (isConfirmed) {
      dispatch(deleteTransaction(transaction.id));
    }
  }

  useEffect(() => {
    if (!category) {
      dispatch(deleteTransaction(transaction.id))
    }
  }, [category, dispatch, transaction.id]);

  const moneyType = category?.type === 'income' ? 'text-success' : 'text-danger';


  return (
    <li className='d-flex border align-items-center p-3 rounded-3 m-3'>
      <p className='mb-0 fw-bold'>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</p>
      <p className='mb-0 ms-5 fw-semibold'>{category ? category.name : 'category doesnt exist'}</p>
      <p className={`mb-0 ms-auto ${moneyType}`}>{transaction.amount} KGS</p>
      <button onClick={handleDelete} className="btn btn-danger btn-sm ms-2">Delete</button>
    </li>
  );
};

export default TransactionItem;
