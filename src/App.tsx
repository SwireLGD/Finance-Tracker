import Appbar from "./components/Appbar/Appbar";
import CategoriesList from "./components/categories/CategoryList";
import TransactionsList from "./components/transactions/transactions"

;const App = () => {

  return (
    <>
      <Appbar />
      <TransactionsList />
      <CategoriesList />
    </>
  );
};

export default App;