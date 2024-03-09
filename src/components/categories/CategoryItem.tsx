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
    dispatch(deleteCategory(category.id));
  };

  return (
    <li>
      {category.name} - {category.type}
      <button onClick={handleDelete}>Delete</button>
      <button>Edit</button>
    </li>
  );
};

export default CategoryItem;
