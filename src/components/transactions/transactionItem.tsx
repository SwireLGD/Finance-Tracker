import React, { useEffect } from 'react';
import { Transaction } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import dayjs from 'dayjs';
import { deleteTransaction } from '../../store/transactionThunks';
import { RootState } from '../../app/store';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onEdit }) => {
  const dispatch = useAppDispatch();
  const { items: categories, fetchLoading: categoriesLoading } = useAppSelector((state: RootState) => state.category);
  const category = categories.find(c => c.id === transaction.category);
  const deleteLoading = useAppSelector((state) => state.transaction.deleteLoading);

  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this transaction?');
    if (isConfirmed) {
      dispatch(deleteTransaction(transaction.id));
    }
  }

  useEffect(() => {
    if (!categoriesLoading && !category) {
      dispatch(deleteTransaction(transaction.id));
    }
  }, [categoriesLoading, category, dispatch, transaction.id]);

  const moneyType = category?.type === 'income' ? 'text-success' : 'text-danger';

  return (
    <li className='d-flex border align-items-center p-3 rounded-3 m-3'>
      <p className='mb-0 fw-bold'>{dayjs(transaction.createdAt).format('DD.MM.YYYY HH:mm:ss')}</p>
      <p className='mb-0 ms-5 fw-semibold'>{category ? category.name : 'category doesnt exist'}</p>
      <p className={`mb-0 ms-auto ${moneyType}`}>{transaction.amount} KGS</p>
      <button onClick={handleDelete} disabled={deleteLoading === transaction.id}>
        {deleteLoading === transaction.id ? <ButtonSpinner /> : 'Delete'}
      </button>
      <button className="btn btn-success btn-sm ms-2" onClick={() => onEdit(transaction)}>Edit</button>
    </li>
  );
};

export default TransactionItem;
