import axios from "./axiosContext";

import React from "react";

const getAllCategories = async () => {
  try {
    const response = await axios.get("/categories");
    return response.data.data; // Assuming the categories are in the 'data' field
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};
const getAllSubCategories = async() => {
  try {
    const response = await axios.get('/subCategories')
    return response.data.data
  } catch (error) {
    console.error('Error fetching subcategories', error)
    throw error
  }
}
const getAllProducts = async () => {
  try {
    const response = await axios.get("/product");
    console.log("API response:", response); // Log the API response
    return response.data.data;
  } catch (error) {
    console.error("error fetching all products", error);
  }
};
const getProductById = async (id) => {
  try {
    const response = await axios.get(`/product/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("error fetching prodcut by id", error);
  }
};
export default { getAllCategories, getAllProducts, getProductById, getAllSubCategories };
