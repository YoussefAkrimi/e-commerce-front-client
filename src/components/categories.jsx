import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import category from "../service/details";
import subCategory from "../service/details";

const Categories = () => {
  const [categ, setCategories] = useState([]);
  const navigate = useNavigate(); // To navigate after successful update
  const [subCateg, setSubCateg] = useState({});

  // Fetch all categories
  const getAllCategories = async () => {
    const data = await category.getAllCategories();
    setCategories(data);
    console.log("Categories fetched:", data); // Debug log
  };

  // Fetch all subcategories and count them per category
  const getAllSubCategories = async () => {
    try {
      const subcategories = await subCategory.getAllSubCategories();

      const count = {};

      // Loop through subcategories to count them by category ID
      subcategories.forEach((subCategory) => {
        if (subCategory.category && subCategory.category._id) {
          const categoryId = subCategory.category._id;
          count[categoryId] = (count[categoryId] || 0) + 1;
        } else {
          console.log(
            "Invalid subCategory, missing category._id:",
            subCategory
          );
        }
      });

      setSubCateg(count);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    getAllCategories();
    getAllSubCategories();
  }, []);

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 pb-3">
        {categ?.map((item) => {
          // Get the subcategory count for this category
          const count = subCateg[item._id] || 0;
          return (
            <div className="col-lg-4 col-md-6 pb-1" key={item._id} onClick={() => navigate(`/category/${item._id}`)} // Navigate on click
            style={{ cursor: "pointer" }}
          >
              <div
                className="cat-item d-flex flex-column border mb-4"
                style={{ padding: 30 }}
              >
                <p className="text-right">{count} Subcategories</p>
                <a
                  href
                  className="cat-img position-relative overflow-hidden mb-3"
                >
                  <img
                    className="img-fluid"
                    src={`http://localhost:3000/storage/${item.image}`}
                    alt="img"
                    width={250}
                    height={100}
                  />
                </a>
                <h5 className="font-weight-semi-bold m-0">{item.name}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
