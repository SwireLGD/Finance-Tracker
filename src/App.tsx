import Appbar from "./components/Appbar/Appbar";
import CategoriesList from "./components/categories/CategoryList";
import TransactionsList from "./components/transactions/transactions"

;const App = () => {

  return (
    <>
      <header>
        <Appbar />
      </header>
      <main className="container-fluid">
        <TransactionsList />
        <CategoriesList />
      </main>
    </>
  );
};

export default App;