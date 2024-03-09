import React, { useState } from 'react';
import { Transaction } from '../types';
import Modal from '../components/Modal.tsx/Modal';
import TransactionForm from '../components/AddTransaction/AddTransaction';


const TransactionsManager = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | undefined>(undefined);

  const handleOpenModal = (transaction?: Transaction) => {
    setCurrentTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTransaction(undefined);
  };

  return (
    <div>
      <button onClick={() => handleOpenModal()}>Add Transaction</button>
      <Modal show={isModalOpen} title="Transaction" onClose={handleCloseModal}>
        <TransactionForm transaction={currentTransaction} onClose={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default TransactionsManager;
