import React from 'react';
import { Category } from '../../types';
import { useAppDispatch } from '../../app/hooks';
import { deleteCategory } from '../../store/categoriesThunks';


interface CategoryItemProps {
    category: Category;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category }) => {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    const isConfirmed = window.confirm('Confirm delete');
    if (isConfirmed) {
      dispatch(deleteCategory(category.id));
    } else return;
  };

  return (
    <li className='list-group-item m-2 border rounded-3 d-flex align-items-center'>
      <p className='mb-0'>{category.name}</p>
      <p className='mb-0 ms-auto me-2'>{category.type}</p> 
      <button onClick={handleDelete} className='btn btn-danger me-1'>Delete</button>
      <button className='btn btn-success'>Edit</button>
    </li>
  );
};

export default CategoryItem;
