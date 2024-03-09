import React from 'react';
import { Category } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { deleteCategory } from '../../store/categoriesThunks';
import { RootState } from '../../app/store';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';


interface CategoryItemProps {
    category: Category;
    onEdit: (category: Category) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, onEdit }) => {
  const dispatch = useAppDispatch();
  const deleteLoading = useAppSelector((state: RootState) => state.category.deleteLoading);


  const handleDelete = () => {
    const isConfirmed = window.confirm('Confirm delete');
    if (isConfirmed) {
      dispatch(deleteCategory(category.id));
    } else return;
  };

  const handleEdit = () => {
    onEdit(category);
  };

  return (
    <li className='list-group-item m-2 border rounded-3 d-flex align-items-center'>
      <p className='mb-0'>{category.name}</p>
      <p className='mb-0 ms-auto me-2'>{category.type}</p> 
      <button onClick={handleDelete} className='btn btn-danger me-1' disabled={deleteLoading === category.id}>
        {deleteLoading === category.id ? <ButtonSpinner /> : "Delete"}
      </button>
      <button onClick={handleEdit} className='btn btn-success'>Edit</button>
    </li>
  );
};

export default CategoryItem;
