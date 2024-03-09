import React, { useState } from 'react';
import Modal from '../Modal.tsx/Modal';
import AddCategory from '../CategoryForm/CategoryForm';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchCategories } from '../../store/categoriesThunks';
import CategoryItem from './CategoryItem';
import { Category } from '../../types';
import { RootState } from '../../app/store';
import Spinner from '../Spinner/Spinner';

const CategoriesList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.items);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { fetchLoading } = useAppSelector((state: RootState) => state.category);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  }

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className='mt-3'>
    <div className='d-flex justify-content-between mb-4'>
      <h2>Categories</h2>
      <button onClick={handleOpenModal} className='btn btn-primary'>Add Category</button>
    </div>
    <Modal
      show={isModalOpen}
      title={editingCategory ? "Edit Category" : "Add New Category"}
      onClose={handleCloseModal}
    >
      <AddCategory onClose={handleCloseModal} existingCategory={editingCategory} />
    </Modal>
    {fetchLoading ? (
      <Spinner /> 
    ) : (
      <ul className='list-group'>
        {categories.map((category) => (
          <CategoryItem key={category.id} category={category} onEdit={handleEdit} />
        ))}
      </ul>
    )}
  </div>
  );
};

export default CategoriesList;
