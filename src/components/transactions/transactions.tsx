import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchTransactions } from "../../store/transactionThunks";
import Spinner from "../Spinner/Spinner";
import { fetchCategories } from "../../store/categoriesThunks";
import TransactionItem from "./transactionItem";
import { Transaction } from "../../types";
import Modal from "../Modal.tsx/Modal";
import TransactionForm from "../AddTransaction/AddTransaction";

export const TransactionsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items: transactions, fetchLoading } = useAppSelector((state: RootState) => state.transaction);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const { items: categories } = useAppSelector((state: RootState) => state.category);

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleEdit = (transaction: Transaction) => {
      setEditingTransaction(transaction);
      setIsModalOpen(true);
    };

    const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingTransaction(null);
    };

    const total = useMemo(() => transactions.reduce((acc, transaction) => {
      const category = categories.find(c => c.id === transaction.category);
      if (category) {
          return category.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
      }
      return acc;
    }, 0), [transactions, categories]);

    if (fetchLoading) {
        return <Spinner />;
    }

    const sortedTransactions = transactions.slice().sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return (
        <div className="m-2">
          <h2>Total: {total} KGS</h2>
          {isModalOpen && editingTransaction && (
            <Modal show={isModalOpen} title="Edit Transaction" onClose={handleCloseModal}>
              <TransactionForm transaction={editingTransaction} onClose={handleCloseModal} />
            </Modal>
          )}
          {transactions.length > 0 ? (
            <ul>
              {sortedTransactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} onEdit={handleEdit} />
              ))}
            </ul>
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
    );
};

export default TransactionsList;
