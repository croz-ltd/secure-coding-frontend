import { Route, Routes } from 'react-router-dom';
import ProductPage from "./pages/ProductPage/ProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {HeaderStyles} from "@owasp-guidelines-frontend/shared-lib";
import {ProductListPage} from "./pages/ProductListPage/ProductListPage";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <header className={HeaderStyles.header}>WebShop</header>
      <Routes>
        <Route
          path="/product/:id"
          element={<ProductPage/>}
        />
        <Route
          path="/login"
          element={<LoginPage/>}
        />
        <Route
          path="/home"
          element={<ProductListPage />}
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
