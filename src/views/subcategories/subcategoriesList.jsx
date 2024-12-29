import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import subCategory from "../../service/details";
import "./SubCategoriesList.css"; // Add a CSS file for custom styles
import Topbar from "../../components/topbar";

const SubCategoriesList = () => {
  const { categoryId } = useParams();
  const [subCategories, setSubCategories] = useState([]);

  const fetchSubCategories = async () => {
    try {
      const data = await subCategory.getAllSubCategories();
      const filtered = data.filter(
        (subCat) => subCat.category && subCat.category._id === categoryId
      );
      setSubCategories(filtered);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchSubCategories();
  }, [categoryId]);

  return (
    <div>
    <Topbar/>
    <div className="container-fluid pt-5">
      <h2 className="text-center mb-4">Subcategories</h2>
      <div className="row px-xl-5 pb-3">
        {subCategories?.map((subCat) => (
          <div className="col-lg-4 col-md-6 pb-1" key={subCat._id}>
            <Link to={`/subcategory/${subCat._id}/products`} className="sub-cat-link">
              <div className="sub-cat-item d-flex flex-column border rounded shadow-sm mb-4">
                <div className="sub-cat-header">
                  <h5 className="font-weight-semi-bold">{subCat.name}</h5>
                </div>
                <div className="sub-cat-body">
                  <p className="sub-cat-description">{subCat.description}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default SubCategoriesList;
