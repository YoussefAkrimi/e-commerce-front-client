import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import auth from "../../service/auth";
import Swal from "sweetalert2";

const Register = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    city: "",
    cin: "",
    image: "",
  });
  const navigate = useNavigate();
  const onChangeHandler = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onChangeImage = async (e) => {
    setData({ ...data, image: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = new FormData();
    formdata.append("fullName", data.fullName);
    formdata.append("email", data.email);
    formdata.append("phone", data.phone);
    formdata.append("address", data.address);
    formdata.append("password", data.password);
    formdata.append("city", data.city);
    formdata.append("cin", data.cin);
    formdata.append("image", data.image);
    auth
      .Register(formdata)
      .then((res) => {
        console.log(res.data);
        setData({
          fullName: "",
          email: "",
          phone: "",
          password: "",
          address: "",
          city: "",
          cin: "",
          image: "",
        });
        e.target.reset();
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "Your account has been created successfully.",
        });
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again.",
        });
      });
  };

  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center bg-secondary " >
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-4 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <a
                    href="./index.html"
                    className="text-nowrap logo-img text-center d-block py-3 w-100"
                  >
                    <img
                      src="/img/logo-with-hanger-design_1363-22.jpg"
                      alt="Logo"
                      className="img-fluid"
                      style={{ maxWidth: "150px", height: "auto" }}
                    />
                  </a>
                  <p className="text-center">Create a New Account</p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3 ">
                      <label htmlFor="fullName" className="form-label">
                        Full Name
                      </label>
                      <input
                        name="fullName"
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={data.fullName}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        value={data.password}
                        className="form-control"
                        id="password"
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={data.phone}
                        className="form-control"
                        id="phone"
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <input
                        name="address"
                        type="text"
                        value={data.address}
                        className="form-control"
                        id="address"
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="city" className="form-label">
                        City
                      </label>
                      <input
                        name="city"
                        type="text"
                        value={data.city}
                        className="form-control"
                        id="city"
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="cin" className="form-label">
                        CIN Number
                      </label>
                      <input
                        name="cin"
                        type="text"
                        value={data.cin}
                        className="form-control"
                        id="cin"
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="image" className="form-label">
                        Picture
                      </label>
                      <input
                        name="image"
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={onChangeImage}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-8 fs-4 mb-4"
                    >
                      Sign Up
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold" style={{ marginRight: "10px" }}>
                        Already have an Account?
                      </p>
                      <Link to="/login" className="text-primary fw-bold ms-2">
                        Sign In
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
