import { Route, Routes, Link } from 'react-router-dom';
import ProductPage from "./pages/ProductPage/ProductPage";
import LoginPage from "./pages/LoginPage/LoginPage";

export function App() {
  return (
    <>
      <header className="header">WebShop</header>
      <Routes>
        <Route
          path="/"
          element={<ProductPage />}
        />
        <Route
          path="/login"
          element={<LoginPage />}
        />
        <Route
          path="/page-2"
          element={
            <div>
              <Link to="/">Click here to go back to root page.</Link>
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
