import { useEffect, useState } from "react";

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    // Function to fetch products from API
    const getProducts = async () => {
        try {
            let response = await fetch("http://localhost:8050/list-product");
            let result = await response.json();
            setProducts(result);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    return (
        <div className="product-list-container">
            <h1>Product Listing</h1>
            {products.length > 0 ? (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Company</th>
                            <th>Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.name}</td>
                                <td>{item.category}</td>
                                <td>{item.company}</td>
                                <td>${item.price}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="loading-text">Loading products...</p>
            )}
        </div>
    );
};

export default ProductList;
