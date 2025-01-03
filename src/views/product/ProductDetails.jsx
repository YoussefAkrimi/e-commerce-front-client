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
