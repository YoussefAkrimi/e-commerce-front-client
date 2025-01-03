import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../store/cartSlice";
import "./CartDetails.css";
import { useNavigate } from "react-router-dom";

const CartDetails = () => {
  const cart = useSelector((state) => state.cart);
  const price = useSelector((state) => state.cart.totalPrice);
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoToHomepage = () => {
    navigate("/");
  };
  const handleGoToPayment = () => {
    navigate("/payment");  // Assuming the payment page route is '/payment'
  };
  return (
    <div className="cart-page container-fluid py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <h2 className="text-center mb-4">Your Cart</h2>
          {cart.Products?.length > 0 ? (
            <>
              <table className="table table-striped">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Product ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price (per unit)</th>
                    <th scope="col">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.Products.map((item, index) => (
                    <tr key={index}>
                      <td>{item.productId}</td>
                      <td>{item.productName}</td>
                      <td>{item.productQuantity}</td>
                      <td>${item.productPrice}</td>
                      <td>${item.productPrice * item.productQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="cart-summary mt-4">
                <div className="summary-box d-flex justify-content-between align-items-center p-3">
                  <h4>Total Items:</h4>
                  <h4>{quantity}</h4>
                </div>
                <div className="summary-box d-flex justify-content-between align-items-center p-3 mt-2">
                  <h4>Total Price:</h4>
                  <h4>${price}</h4>
                  <button
                    className="btn btn-danger btn-clear"
                    onClick={() => dispatch(clearCart())}
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center empty-cart">
              <h4 className="text-muted">Your cart is empty!</h4>
              <p>Add items to see them here.</p>
            </div>
          )}
          {/* Add the button to go back to the homepage */}
          <div className="text-center mt-4">
            <button className="btn btn-home" onClick={handleGoToHomepage}>
              Go To Homepage
            </button>
            <button className="btn btn-primary ml-2" onClick={handleGoToPayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
