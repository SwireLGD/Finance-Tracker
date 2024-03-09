import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { fetchTransactions } from "../../store/transactionThunks";
import Spinner from "../Spinner/Spinner";
import { fetchCategories } from "../../store/categoriesThunks";
import TransactionItem from "./transactionItem";

export const TransactionsList: React.FC = () => {
    const dispatch = useAppDispatch();
    const { items: transactions, fetchLoading } = useAppSelector((state: RootState) => state.transaction);

    useEffect(() => {
        dispatch(fetchTransactions());
        dispatch(fetchCategories());
    }, [dispatch]);

    if (fetchLoading) {
        return <Spinner />;
    }

    return (
        <div>
          <h2>Transactions</h2>
          {transactions.length > 0 ? (
            <ul>
              {transactions.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} />
              ))}
            </ul>
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
    );
};

export default TransactionsList;
