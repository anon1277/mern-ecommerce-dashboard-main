const mongoose = require('mongoose');

// Replace this with your connection string
mongoose.connect('mongodb://localhost:27017/e-comm', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
