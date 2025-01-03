import "./App.css";
import Home from "./views/home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import PaymentForm from "./views/payment/PaymentForm";

// Import Stripe-related dependencies
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

// Load your Stripe publishable key (replace with your actual key)
const stripePromise = loadStripe(
  "pk_test_51QccfrBLtvvVDjHKvUolHeRu5jnI7mySUSXbcZVGrU7WYa9hYPiV10TUjVjamDzwHMki9soRv5ogEdTcJXRbVwYp00IJ0UJiw9"
);

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
        <Route path="/favourites" element={<FavouritesPage />} />
        <Route path="/category/:categoryId" element={<SubCategoriesList />} />
        <Route
          path="/subcategory/:subcategoryId/products"
          element={<LinkedProducts />}
        />

        {/* Wrap the PaymentForm with Elements provider */}
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <PaymentForm />
            </Elements>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
