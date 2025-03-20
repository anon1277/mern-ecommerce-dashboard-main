import React, { useState } from 'react';

const AddProduct = () => {

    // State variables to store product details
    const [productname, setProductname] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productCompany, setProductCompany] = useState('');
    const [productCategory, setproductCategory] = useState('');

    // Function to handle product addition
    const HandleAddProduct = async () => {
        try {
            // Retrieve user details from localStorage
            const user = localStorage.getItem('user');
            if (!user) {
                console.error("User not found in localStorage");
                return;
            }

            // Parse user data from localStorage
            const userId = JSON.parse(user);
            console.log("User ID:", userId);

            // Send a POST request to the backend API to add the product
            const response = await fetch("http://localhost:8050/add-product", {
                method: "POST",
                body: JSON.stringify({ 
                    name: productname, 
                    price: productPrice, 
                    company: productCompany, 
                    userId: userId,
                    category: productCategory 
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            });

            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            // Parse and log the response
            const result = await response.json();
            console.log('Product added successfully:', result);
        } catch (error) {
            // Log any errors encountered during the request
            console.error("Failed to add product:", error);
        }
    };

    return (
        <>
            <div className='add-product'>
                <h1>Add Product Page</h1>

                {/* Input field for product name */}
                <input 
                    type='text' 
                    className='inputBox' 
                    onChange={(e) => setProductname(e.target.value)} 
                    name="product_name" 
                    id="product_name" 
                    placeholder='Enter Product Name' 
                />
                <br/>

                {/* Input field for product price */}
                <input 
                    type='text' 
                    className='inputBox' 
                    onChange={(e) => setProductPrice(e.target.value)} 
                    name="produxt_price" 
                    id="produxt_price" 
                    placeholder='Enter Product Price' 
                />
                <br/>

                {/* Input field for product company */}
                <input 
                    type='text' 
                    className='inputBox' 
                    onChange={(e) => setProductCompany(e.target.value)} 
                    name="produxt_company" 
                    id="produxt_company" 
                    placeholder='Enter Product Company' 
                />
                <br/>

                {/* Input field for product category */}
                <input 
                    type='text' 
                    className='inputBox' 
                    onChange={(e) => setproductCategory(e.target.value)}  
                    name="product_category" 
                    id="product_category" 
                    placeholder='Enter Product Category' 
                />
                <br/>

                {/* Button to trigger product addition */}
                <button className='add-product-btn' onClick={HandleAddProduct}> 
                    Add Product
                </button>
                <br/>
            </div>
        </>
    );
};

export default AddProduct;
