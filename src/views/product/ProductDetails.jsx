// ProductDetails.jsx
import React, { useEffect, useState } from "react";
import details from "../../service/details"; // Import details.js directly
import { useParams } from "react-router-dom";
import { addToCart } from "../../store/cartSlice";
import Topbar from "../../components/topbar";
import Footer from "../../components/footer";
import Slider from "../../components/slider";
import { useDispatch } from "react-redux";

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get the 'id' from the URL params
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await details.getProductById(id); // Use details directly
        setProduct(response); // Assuming response.data contains the product details
      } catch (err) {
        console.error("Error fetching product details", err);
      }
    };

    fetchProductDetails();
  }, [id]);

    if (!product) return <p>Product not found</p>;

  const handleIncrement = () => {
    setQuantity((prevQuantity) =>
      prevQuantity < product?.qte ? prevQuantity + 1 : prevQuantity
    ); // Prevent exceeding stock
  };
  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const handleAddToCart = (prod) => {
    const cartData = {
      productId: prod._id,
      productPrice: prod.price,
      productQuantity: quantity,
      productName: prod.name
    }
    console.log('error : ', cartData)
    dispatch(addToCart(cartData))
  };

  return (
    <div>
      {/* Topbar Start */}
      <Topbar />
      {/* Topbar End */}
      {/* Navbar Start */}
      {/* <div className="container-fluid">
        <div className="row border-top px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a
              className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
              data-toggle="collapse"
              href="#navbar-vertical"
              style={{ height: 65, marginTop: "-1px", padding: "0 30px" }}
            >
              <h6 className="m-0">Categories</h6>
              <i className="fa fa-angle-down text-dark" />
            </a>
            <nav
              className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
              id="navbar-vertical"
              style={{ width: "calc(100% - 30px)", zIndex: 1 }}
            >
              <div
                className="navbar-nav w-100 overflow-hidden"
                style={{ height: 410 }}
              >
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link" data-toggle="dropdown">
                    Dresses <i className="fa fa-angle-down float-right mt-1" />
                  </a>
                  <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                    <a href className="dropdown-item">
                      Men's Dresses
                    </a>
                    <a href className="dropdown-item">
                      Women's Dresses
                    </a>
                    <a href className="dropdown-item">
                      Baby's Dresses
                    </a>
                  </div>
                </div>
                <a href className="nav-item nav-link">
                  Shirts
                </a>
                <a href className="nav-item nav-link">
                  Jeans
                </a>
                <a href className="nav-item nav-link">
                  Swimwear
                </a>
                <a href className="nav-item nav-link">
                  Sleepwear
                </a>
                <a href className="nav-item nav-link">
                  Sportswear
                </a>
                <a href className="nav-item nav-link">
                  Jumpsuits
                </a>
                <a href className="nav-item nav-link">
                  Blazers
                </a>
                <a href className="nav-item nav-link">
                  Jackets
                </a>
                <a href className="nav-item nav-link">
                  Shoes
                </a>
              </div>
            </nav>
          </div>
          <div className="col-lg-9">
            <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
              <a href className="text-decoration-none d-block d-lg-none">
                <h1 className="m-0 display-5 font-weight-semi-bold">
                  <span className="text-primary font-weight-bold border px-3 mr-1">
                    E
                  </span>
                  Shopper
                </h1>
              </a>
              <button
                type="button"
                className="navbar-toggler"
                data-toggle="collapse"
                data-target="#navbarCollapse"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <div
                className="collapse navbar-collapse justify-content-between"
                id="navbarCollapse"
              >
                <div className="navbar-nav mr-auto py-0">
                  <a href="index.html" className="nav-item nav-link">
                    Home
                  </a>
                  <a href="shop.html" className="nav-item nav-link">
                    Shop
                  </a>
                  <a href="detail.html" className="nav-item nav-link active">
                    Shop Detail
                  </a>
                  <div className="nav-item dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      data-toggle="dropdown"
                    >
                      Pages
                    </a>
                    <div className="dropdown-menu rounded-0 m-0">
                      <a href="cart.html" className="dropdown-item">
                        Shopping Cart
                      </a>
                      <a href="checkout.html" className="dropdown-item">
                        Checkout
                      </a>
                    </div>
                  </div>
                  <a href="contact.html" className="nav-item nav-link">
                    Contact
                  </a>
                </div>
                <div className="navbar-nav ml-auto py-0">
                  <a href className="nav-item nav-link">
                    Login
                  </a>
                  <a href className="nav-item nav-link">
                    Register
                  </a>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div> */}
      {/* Navbar End */}
      {/* Page Header Start */}
      {/* <div className="container-fluid bg-secondary mb-5">
        <div
          className="d-flex flex-column align-items-center justify-content-center"
          style={{ minHeight: 300 }}
        >
          <h1 className="font-weight-semi-bold text-uppercase mb-3">
            Shop Detail
          </h1>
          <div className="d-inline-flex">
            <p className="m-0">
              <a href>Home</a>
            </p>
            <p className="m-0 px-2">-</p>
            <p className="m-0">Shop Detail</p>
          </div>
        </div>
      </div> */}
      {/* Page Header End */}
      {/* Shop Detail Start */}
      <div className="container-fluid py-5">
        <div className="row px-xl-5">
          <div className="col-lg-5 pb-5">
            <div>
              {product.galleries.length > 0 ? (
                <Slider img={product.galleries} />
              ) : (
                <div style={{ height: "200px", backgroundColor: "#f5f5f5" }} />
              )}
            </div>
          </div>

          <div className="col-lg-7 pb-5">
            <h3 className="font-weight-semi-bold">{product.name}</h3>
            <div className="d-flex mb-3">
              <div className="text-primary mr-2">
                <small className="fas fa-star" />
                <small className="fas fa-star" />
                <small className="fas fa-star" />
                <small className="fas fa-star-half-alt" />
                <small className="far fa-star" />
              </div>
              <small className="pt-1">(50 Reviews)</small>
            </div>
            <h3 className="font-weight-semi-bold mb-4">${product.price}</h3>
            <p className="mb-4">{product.description}</p>
            <p>
              {" "}
              <strong>Available stock:</strong> <br />
              {product.qte}
            </p>

            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3" style={{ width: 130 }}>
                <div className="input-group-btn">
                  <button
                    className="btn btn-primary btn-minus"
                    onClick={handleDecrement}
                  >
                    <i className="fa fa-minus" />
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control bg-secondary text-center"
                  value={quantity}
                  readOnly
                />
                <div className="input-group-btn">
                  <button
                    className="btn btn-primary btn-plus"
                    onClick={handleIncrement}
                  >
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
              <button
                onClick={()=> handleAddToCart(product)}
                className="btn btn-primary px-3"
              >
                <i className="fa fa-shopping-cart mr-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <a href="#" className="btn btn-primary back-to-top">
        <i className="fa fa-angle-double-up" />
      </a>
    </div>
  );
};

export default ProductDetails;
