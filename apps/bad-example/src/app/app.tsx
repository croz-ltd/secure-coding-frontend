import { Route, Routes } from 'react-router-dom';
import ProductPage from "./pages/ProductPage/ProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {HeaderStyles} from "@owasp-guidelines-frontend/shared-lib";
import {ProductListPage} from "./pages/ProductListPage/ProductListPage";
import PasswordResetPage from "./pages/PasswordResetPage/PasswordResetPage";
import ProductFormPage from "./pages/ProductFormPage/ProductFormPage";
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient();

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <header className={HeaderStyles.header}>WebShop</header>
      <Toaster />
      <Routes>
        <Route
          path="/product/new"
          element={<ProductFormPage />}
        />
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
        <Route
          path="/password-reset"
          element={<PasswordResetPage />}
        />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
