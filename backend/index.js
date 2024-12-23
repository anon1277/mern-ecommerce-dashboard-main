const express = require('express'); // Import the express module
const cors = require('cors')
//load database config file
require('./db/config');

const User = require('./db/User');
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
            res.send({ result: "Wrong email or password" });
        }
    } else {
        // If email or password is missing, return an error message
        res.send({ result: "Wrong email or password" });
    }
})

// Start the server and listen on port 8050
app.listen(8050, () => {
    console.log('Server is running on port 8050'); // Log a message when the server starts
});
