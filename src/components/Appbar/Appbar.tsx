import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "../Modal.tsx/Modal";
import TransactionForm from "../AddTransaction/AddTransaction";

const Appbar: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);
        
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand">
                    <NavLink to={"/"} className="nav-link">Finance Tracker</NavLink>
                </span>
                    <ul className="navbar-nav mr-auto flex-row flex-nowrap gap-3">
                        <li className="nav-item">
                            <NavLink to="/categories" className="nav-link">Categories</NavLink>
                        </li>
                        <button onClick={handleOpenModal} className="nav-link">Add</button>
                        {isModalOpen && (
                            <Modal show={isModalOpen} title="Add Transaction" onClose={handleCloseModal}>
                                <TransactionForm onClose={handleCloseModal} />
                            </Modal>
                        )}
                    </ul>
            </div>
        </nav>
    );
  };
  
  export default Appbar;