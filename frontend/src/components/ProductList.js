import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    // Fetch products from API
    const getProducts = async () => {
        try {
            let response = await fetch("http://localhost:8050/list-product");
            let result = await response.json();
            setProducts(result);
            setFilteredProducts(result); // Initialize filtered list
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    // Search functionality
    useEffect(() => {
        const filteredData = products.filter((product) =>
            product.name?.toLowerCase().includes(searchText.toLowerCase()) ||
            product.category?.toLowerCase().includes(searchText.toLowerCase()) ||
            product.company?.toLowerCase().includes(searchText.toLowerCase()) ||
            product.price?.toString().includes(searchText)
        );
        setFilteredProducts(filteredData);
    }, [searchText, products]);

    // Define columns for DataTable with Sorting
    const columns = [
        { name: "#", selector: (row, index) => index + 1, sortable: true },
        { name: "Product Name", selector: (row) => row.name || "N/A", sortable: true },
        { name: "Category", selector: (row) => row.category || "N/A", sortable: true },
        { name: "Company", selector: (row) => row.company || "N/A", sortable: true },
        { name: "Price", selector: (row) => `$${row.price || "0.00"}`, sortable: true },
    ];

    return (
        <div className="product-list-container">
            <h1>Product Listing</h1>

            {/* Built-in Search Box */}
            <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />

            <DataTable
                title="Products"
                columns={columns}
                data={filteredProducts} // Use filtered products
                pagination
                highlightOnHover
                striped
                persistTableHead
                defaultSortFieldId={1}
            />
        </div>
    );
};

export default ProductList;
