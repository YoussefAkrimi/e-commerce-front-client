import React, { useEffect, useState } from "react";
import prod from "../service/details";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { addToFavourite } from "../store/favouriteSlice";

const Products = () => {
  const [ProductsList, setProductsList] = useState([]);

  const getAllProducts = async () => {
    try {
      const data = await prod.getAllProducts();
      console.log(data); // Check the data structure here
      setProductsList(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //redux contents
  const dispatch = useDispatch();

  const addToPanier = (prod) => {
    const cartData = {
      productId: prod._id,
      productPrice: prod.price,
      productQuantity: 1,
      productName: prod.name,
    };

    dispatch(addToCart(cartData));
    console.log(prod);
  };

  const addToFavourites = (prod) => {
    try {
      const favData = {
        productId: prod._id,
        name: prod.name,
        price: prod.price,
        image: prod.galleries[0]?.image, // Add any other product info you need
      };
      dispatch(addToFavourite(favData)); // Dispatch action to add to favourites
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="container-fluid pt-5">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <span className="px-2">Our Products</span>
        </h2>
      </div>
      <div className="row px-xl-5 pb-3">
        {ProductsList.map((item, index) => {
          return (
            <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
              <div className="card product-item border-0 mb-4">
                <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
                  <img
                    className="img-fluid w-100"
                    src={`http://localhost:3000/storage/${item.galleries[0].image}`}
                    alt
                  />
                </div>
                <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
                  <h6 className="text-truncate mb-3">{item.name}</h6>
                  <div className="d-flex justify-content-center">
                    <h6>${item.price}</h6>
                    <h6 className="text-muted ml-2">
                      <del>$123.00</del>
                    </h6>
                  </div>
                  <p className="text-muted mb-0">
                    <strong> Stock:</strong>{" "}
                    {item.qte > 0 ? item.qte : "Out of stock"}
                  </p>
                </div>
                <div className="card-footer d-flex justify-content-between bg-light border">
                  <Link
                    to={`/product/${item._id}`}
                    className="btn btn-sm text-dark p-0"
                  >
                    <i className="fas fa-eye text-primary mr-1" />
                    View Detail
                  </Link>
                  <a
                    onClick={() => addToPanier(item)}
                    className="btn btn-sm text-dark p-0"
                  >
                    <i className="fas fa-shopping-cart text-primary mr-1" />
                    Add To Cart
                  </a>
                  <button
                    onClick={() => addToFavourites(item)}
                    className="btn btn-sm text-dark p-0"
                  >
                    <i className="fas fa-heart text-danger mr-1" />
                    Add To Favorites
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
