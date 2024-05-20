const express = require('express'); // Import the express module

const app = express(); // Create an instance of express

// Define a GET endpoint at the root URL ('/')
app.get('/', (req, res) => {
    res.send("App is Working")
});

// Start the server and listen on port 8050
app.listen(8050, () => {
    console.log('Server is running on port 8050'); // Log a message when the server starts
});
