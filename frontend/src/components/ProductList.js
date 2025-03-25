import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2"; // Import SweetAlert2

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

    // Delete product function with SweetAlert2 confirmation
    const deleteProduct = async (id) => {
        // Show SweetAlert2 confirmation dialog
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:8050/delete-product/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    // Remove deleted product from the list
                    setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
                    setFilteredProducts((prevFiltered) => prevFiltered.filter((product) => product._id !== id));
                    Swal.fire("Deleted!", "Your product has been deleted.", "success"); // Success message
                } else {
                    Swal.fire("Error!", "Failed to delete product.", "error"); // Error message
                }
            } catch (error) {
                console.error("Error deleting product:", error);
                Swal.fire("Error!", "An error occurred while deleting the product.", "error"); // Error message
            }
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

    // Define columns for DataTable with Sorting and Delete Button
    const columns = [
        { name: "#", selector: (row, index) => index + 1, sortable: true },
        { name: "Product Name", selector: (row) => row.name || "N/A", sortable: true },
        { name: "Category", selector: (row) => row.category || "N/A", sortable: true },
        { name: "Company", selector: (row) => row.company || "N/A", sortable: true },
        { name: "Price", selector: (row) => `$${row.price || "0.00"}`, sortable: true },
        {
            name: "Actions",
            cell: (row) => (
                <button
                    onClick={() => deleteProduct(row._id)}
                    style={{ backgroundColor: "red", color: "white", padding: "5px 10px", border: "none", borderRadius: "5px" }}
                >
                    Delete
                </button>
            ),
        },
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
