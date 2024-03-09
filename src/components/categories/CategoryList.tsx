import React, { useState } from 'react';
import Modal from '../Modal.tsx/Modal';
import AddCategory from '../CategoryForm/CategoryForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCategories } from '../../store/categoriesThunks';
import CategoryItem from './CategoryItem';

const CategoriesList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.items);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <div className='d-flex justify-content-between mb-4'>
        <h2>Categories</h2>
        <button onClick={handleOpenModal} className='btn btn-primary'>Add Category</button>
      </div>
      <Modal
        show={isModalOpen}
        title="Add New Category"
        onClose={handleCloseModal}
      >
        <AddCategory onClose={handleCloseModal} />
      </Modal>
      <ul className='list-group'>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} />
        ))}
      </ul>
    </div>
  );
};

export default CategoriesList;
