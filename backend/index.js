const express = require('express'); // Import the express module
const cors = require('cors')
//load database config file
require('./db/config');

const User = require('./db/User'); //User Model
const Product = require('./db/Product') //Product Model
const app = express(); // Create an instance of express

app.use(express.json());

app.use(cors());

// Define a GET endpoint SSat the root URL ('/')
app.get('/', (req, res) => {
    res.send("App is Working")
});
// Register API to create a new user in the database
app.post('/register', async (req, res) => {
    // Create a new user from the request body data
    let user = new User(req.body);

    // Save the user to the database
    let result = await user.save();

    // Convert the result to a plain object to exclude MongoDB-specific fields
    result = result.toObject();

    // Remove the password field from the result before sending the response
    delete result.password;

    // Send the user data as response
    res.send(result);
})

// Login API for user authentication
app.post('/login', async (req, res) => {
    // Check if email and password are provided in the request body
    if (req.body.email && req.body.password) {
        // Search for the user based on the provided email and password (excluding the password field)
        let user = await User.findOne(req.body).select("-password");

        // If user exists, send user data in response
        if (user) {
            res.send(user);
        } else {
            // If no user is found, return an error message
            res.send({
                result: "Wrong email or password"
            });
        }
    } else {
        // If email or password is missing, return an error message
        res.send({
            result: "Wrong email or password"
        });
    }
})

// Endpoint to add a new product
app.post('/add-product', async (req, res) => {

    // Create a new product instance using the request body data
    let product = new Product(req.body);

    try {
        // Save the new product to the database
        let result = await product.save();

        // Send the saved product data as a response
        res.send(result);
    } catch (error) {
        // Handle any errors during the product saving process
        res.status(500).send({
            message: 'Error saving product',
            error: error.message
        });
    }
});

app.get('/list-product', async (req, res) => {
    try {
        // Fetch all products from the database
        let result = await Product.find();

        // Check if the product list is empty
        if (result.length === 0) {
            return res.status(404).send({ message: "No products found" });
        }

        res.send(result);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});

app.delete("/delete-product/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        
        // Validate if the ID is valid
        if (!productId) {
            return res.status(400).json({ message: "Product ID is required" });
        }

        // Attempt to delete the product
        const result = await Product.deleteOne({ _id: productId });

        // Check if a product was deleted
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Send success response
        return res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        // Handle any errors
        console.error("Error deleting product:", error);
        return res.status(500).json({ message: "An error occurred while deleting the product" });
    }
});

// Start the server and listen on port 8050
app.listen(8050, () => {
    console.log('Server is running on port 8050'); // Log a message when the server starts
});