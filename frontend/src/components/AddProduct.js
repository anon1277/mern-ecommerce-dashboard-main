import React, { useState } from "react";

const AddProduct = () => {
  // State variables to store product details
  const [productname, setProductname] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productCompany, setProductCompany] = useState("");
  const [productCategory, setProductCategory] = useState("");

  // Validation state
  const [errors, setErrors] = useState({});

  // Function to validate form fields
  const validateForm = () => {
    let errors = {};

    if (!productname.trim()) errors.productname = "Product name is required";
    if (!productPrice.trim()) {
      errors.productPrice = "Product price is required";
    } else if (isNaN(productPrice) || Number(productPrice) <= 0) {
      errors.productPrice = "Price must be a valid number";
    }
    if (!productCompany.trim()) errors.productCompany = "Company name is required";
    if (!productCategory.trim()) errors.productCategory = "Category is required";

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if no errors
  };

  // Function to handle product addition
  const HandleAddProduct = async () => {
    if (!validateForm()) return; // Stop submission if validation fails

    try {
      const user = localStorage.getItem("user");
      if (!user) {
        console.error("User not found in localStorage");
        return;
      }

      const userId = JSON.parse(user);

      const response = await fetch("http://localhost:8050/add-product", {
        method: "POST",
        body: JSON.stringify({
          name: productname,
          price: productPrice,
          company: productCompany,
          userId: userId,
          category: productCategory,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Product added successfully:", result);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="add-product">
      <h1>Add Product Page</h1>

      {/* Product Name */}
      <input
        type="text"
        className="inputBox"
        value={productname}
        onChange={(e) => setProductname(e.target.value)}
        placeholder="Enter Product Name"
      />
      {errors.productname && <span className="span_error">{errors.productname}</span>}
      <br />

      {/* Product Price */}
      <input
        type="text"
        className="inputBox"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
        placeholder="Enter Product Price"
      />
      {errors.productPrice && <span className="span_error">{errors.productPrice}</span>}
      <br />

      {/* Product Company */}
      <input
        type="text"
        className="inputBox"
        value={productCompany}
        onChange={(e) => setProductCompany(e.target.value)}
        placeholder="Enter Product Company"
      />
      {errors.productCompany && <span className="span_error">{errors.productCompany}</span>}
      <br />

      {/* Product Category */}
      <input
        type="text"
        className="inputBox"
        value={productCategory}
        onChange={(e) => setProductCategory(e.target.value)}
        placeholder="Enter Product Category"
      />
      {errors.productCategory && <span className="span_error">{errors.productCategory}</span>}
      <br />

      {/* Submit Button */}
      <button className="add-product-btn" onClick={HandleAddProduct} disabled={Object.keys(errors).length > 0}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
