import { Route, Routes } from "react-router-dom";
import Appbar from "./components/Appbar/Appbar";
import TransactionsList from "./components/transactions/transactions";
import CategoriesList from "./components/categories/CategoryList";
import PageNotFound from "./containers/PageNotFound";


;const App = () => {

  return (
    <>
      <header>
        <Appbar />
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<TransactionsList />} />
          <Route path="/categories" element={<CategoriesList />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </>
  );
};

export default App;