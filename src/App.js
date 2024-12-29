import "./App.css";
import Home from "./views/home/home";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./views/home/layout";
import Register from "./views/authentication/register";
import Login from "./views/authentication/login";
import ForgotPassword from "./views/authentication/forgotPassword";
import ResetPassword from "./views/authentication/resetPassword";
import ProductDetails from "./views/product/ProductDetails";
import CartDetails from "./views/cart/cartDetails";
import FavouritesPage from "./views/favourites/FavouritesPage";
import SubCategoriesList from "./views/subcategories/subcategoriesList";
import LinkedProducts from "./views/product/LinkedProducts";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/" element={<Layout />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartDetails />} />
        <Route path="category/:categoryId" element={<SubCategoriesList />} />
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/subcategory/:subcategoryId/products" element={<LinkedProducts />} />

      </Routes>
    </Router>
  );
}

export default App;
