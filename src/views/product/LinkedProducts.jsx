import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import productService from "../../service/details";
import './LinkedProducts.css'; // Import the external CSS file
import Topbar from "../../components/topbar";

const LinkedProducts = () => {
  const { subcategoryId } = useParams();
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await productService.getAllProducts();
      const filtered = data.filter(
        (product) => product.subcategory && product.subcategory._id === subcategoryId
      );
      setProducts(filtered);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [subcategoryId]);

  return (

    <div>
    {/* Add Topbar at the top of the page */}
    <Topbar />
    <div className="container-fluid pt-5 linked-products-container"> {/* Add this class */}
      <div className="row px-xl-5 pb-3">
        {products.length > 0 ? (
          products.map((product) => (
            <div className="col-lg-4 col-md-6 pb-4" key={product._id}>
              <div className="product-item">
                {/* Display product image if available */}
                {product.image && <img src={product.image} alt={product.name} />}
                <h5>{product.name}</h5>
                <p>{product.description}</p>
                <span className="price">${product.price}</span>
                {/* View details button */}
                <a href={`/product/${product._id}`} className="view-details">
                  View Details
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <p className="no-products">No products found for this subcategory.</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default LinkedProducts;
