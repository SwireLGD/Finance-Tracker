import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store'; 
import { Transaction, ApiTransaction } from '../../types';
import dayjs from 'dayjs';
import { addTransaction, updateTransaction } from '../../store/transactionThunks';
import { useAppDispatch } from '../../app/hooks';

interface Props {
  transaction?: Transaction;
  onClose: () => void;
}

const TransactionForm: React.FC<Props> = ({ transaction, onClose }) => {
    const dispatch = useAppDispatch();
    const categories = useSelector((state: RootState) => state.category.items);

    const [type, setType] = useState<'income' | 'expense'>('income');
    const [category, setCategory] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (transaction) {
        setType(categories.find(c => c.id === transaction.category)?.type ?? 'income');
        setCategory(transaction.category);
        setAmount(transaction.amount.toString());
        }
    }, [transaction, categories]);

    const filteredCategories = categories.filter(c => c.type === type);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newTransaction: ApiTransaction = {
            category,
            amount: Number(amount),
            createdAt: transaction?.createdAt || dayjs().toISOString(),
        };

        if (transaction) {
            dispatch(updateTransaction({ ...newTransaction, id: transaction.id }));
        } else {
            dispatch(addTransaction(newTransaction));
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='form-group d-flex align-items-center mt-3'>
                <label className='me-2'>Type</label>
                <select value={type} onChange={(e) => setType(e.target.value as 'income' | 'expense')} className='form-control' required> 
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                </select>
            </div>
            <div className='form-group d-flex align-items-center m-2'>
                <label className='me-2'>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className='form-control' required>
                <option value="">Select a category</option>
                {filteredCategories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                ))}
                </select>
            </div>
            <div className='form-group d-flex align-items-center m-2'>
                <label className='me-2'>Amount (KGS)</label>
                <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className='form-control' required />
            </div>
            <button type="submit" className='btn btn-primary me-2'>Submit</button>
            <button type="button" onClick={onClose} className='btn btn-danger'>Cancel</button>
        </form>
    );
};

export default TransactionForm;