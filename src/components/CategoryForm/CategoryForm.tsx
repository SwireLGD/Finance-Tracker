import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addCategory } from '../../store/categoriesThunks';
import ButtonSpinner from '../ButtonSpinner/ButtonSpinner';
import { ApiCategory } from '../../types';


interface Props {
    onClose: () => void;
    isLoading?: boolean;
    existingCategory?: ApiCategory;
}

const initialState = {
    name: '',
    type: 'income',
};

const AddCategory: React.FC<Props> = ({ onClose, isLoading = false, existingCategory }) => {
    const [category, setCategory] = useState(initialState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (existingCategory) {
          setCategory(existingCategory);
        }
      }, [existingCategory]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setCategory(prevState => ({
        ...prevState,
        [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (category.type === 'income' || category.type === 'expense') {
            const newCategory: ApiCategory = {
                name: category.name,
                type: category.type as 'income' | 'expense',
            };
            dispatch(addCategory(newCategory));
            onClose();
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                type="text"
                name="name"
                id="name"
                className="form-control"
                value={category.name}
                onChange={handleChange}
                required
                />
            </div>
            <div className="form-group">
                <label htmlFor="type">Type</label>
                <select
                name="type"
                id="type"
                className="form-control"
                value={category.type}
                onChange={handleChange}
                required
                >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary mt-3" disabled={isLoading}>
                {isLoading && <ButtonSpinner/>}
                Add Category
            </button>
        </form>
    );
};

export default AddCategory;