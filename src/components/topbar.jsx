import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Topbar = () => {
  // Access the 'favo' array from the Redux store
  const cart = useSelector((state) => state.cart.totalQuantity);
  const favourite = useSelector((state) => state.fav.favo || []); // Ensure it's an empty array if undefined
  const favQuantity = favourite.length; // This should update automatically

  return (
    <div id="topbar">
      {/* Topbar Start */}
      <div className="container-fluid">
        <div className="row bg-secondary py-2 px-xl-5">
          <div className="col-lg-6 d-none d-lg-block">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark" href="#">
                FAQs
              </a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark" href="#">
                Help
              </a>
              <span className="text-muted px-2">|</span>
              <a className="text-dark" href="#">
                Support
              </a>
            </div>
          </div>
          <div className="col-lg-6 text-center text-lg-right">
            <div className="d-inline-flex align-items-center">
              <a className="text-dark px-2" href="#">
                <i className="fab fa-facebook-f" />
              </a>
              <a className="text-dark px-2" href="#">
                <i className="fab fa-twitter" />
              </a>
              <a className="text-dark px-2" href="#">
                <i className="fab fa-linkedin-in" />
              </a>
              <a className="text-dark px-2" href="#">
                <i className="fab fa-instagram" />
              </a>
              <a className="text-dark pl-2" href="#">
                <i className="fab fa-youtube" />
              </a>
            </div>
          </div>
        </div>
        <div className="row align-items-center py-3 px-xl-5">
          <div className="col-lg-3 d-none d-lg-block">
            <a href="#" className="text-decoration-none">
              <h1 className="m-0 display-5 font-weight-semi-bold">
                <span className="text-primary font-weight-bold border px-3 mr-1">
                  E
                </span>
                Shopper
              </h1>
            </a>
          </div>
          <div className="col-lg-6 col-6 text-left">
            <form action="#">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search for products"
                />
                <div className="input-group-append">
                  <span className="input-group-text bg-transparent text-primary">
                    <i className="fa fa-search" />
                  </span>
                </div>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-6 text-right">
          <Link to='/favourites' className="btn border">
              <i className="fas fa-heart text-primary" />
              <span style={{color:'black'}} className="badge">{favQuantity}</span> {/* Display the number of favorites */}
            </Link>
            <Link to="/cart" href="#" className="btn border">
              <i className="fas fa-shopping-cart text-primary" />
              <span className="badge">{cart}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
