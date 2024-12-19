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


app.post('/register', async (req, res) => {
    let user = new User(req.body);

    let result = await user.save();
    res.send(result);
})

// Start the server and listen on port 8050
app.listen(8050, () => {
    console.log('Server is running on port 8050'); // Log a message when the server starts
});
