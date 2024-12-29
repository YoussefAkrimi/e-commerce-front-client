import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAllFavourites, removeFavourite } from "../../store/favouriteSlice";
import "./FavouritesPage.css"; // Import updated CSS

const FavouritesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favourites = useSelector((state) => state.fav.favo);

  const handleClearAll = () => {
    dispatch(clearAllFavourites());
  };

  const handleRemoveFavourite = (productId) => {
    dispatch(removeFavourite(productId));
  };

  const handleGoToHomepage = () => {
    navigate("/");
  };

  return (
    <div className="favourites-page-wrapper">
      <div className="header-section">
        <h1>Your Favourite Products</h1>
      </div>
      <div className="content-section">
        {favourites.length === 0 ? (
          <div className="empty-state">
            <p>No favourites yet. Add some!</p>
            <button className="btn btn-home" onClick={handleGoToHomepage}>
              Go to Homepage
            </button>
          </div>
        ) : (
          <>
            <div className="favourites-grid">
              {favourites.map((item) => (
                <div key={item.productId} className="favourite-card">
                  <img
                    src={`http://localhost:3000/storage/${item.image}`}
                    alt={item.name}
                    className="product-image"
                  />
                  <div className="overlay">
                    <h4>{item.name}</h4>
                    <p>${item.price}</p>
                    <div className="actions">
                      <Link to={`/product/${item.productId}`} className="btn btn-view">
                        View Details
                      </Link>
                      <button
                        className="btn btn-remove"
                        onClick={() => handleRemoveFavourite(item.productId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="clear-all">
              <button className="btn btn-clear" onClick={handleClearAll}>
                Clear All Favourites
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
  
};

export default FavouritesPage;
