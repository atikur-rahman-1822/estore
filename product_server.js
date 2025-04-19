const mongoose = require('mongoose');
const Product = require('./product');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

// Replace the password in the line below
const uri = "mongodb://root:zJFlGDA0bsFwkmHlbKHzOBYd@172.21.207.71:27017";

// MongoDB Connection with error handling
mongoose.connect(uri, { dbName: 'productDB' })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Middleware to parse JSON requests - applied globally
app.use(bodyParser.json());

// GET endpoint
app.get('/products', async (req, res) => {
  try {
    const documents = await Product.find();
    if (!documents.length) {
      return res.status(404).json({ error: "No products found" });
    }
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// POST endpoint for adding an employee
app.post('/add_product', async (req, res) => {
  try {
    const data = req.body;
    const product = new Product({
		id: data.id,
		name: data.name,
		description: data.description,
		price: data.price,
		image_url: data.image_url
    });

    // Save the Product to the database
    await product.save();
    res.json({ message: 'Product added successfully' });
  } catch (error) {
    res.status(500).json({ error: "Failed to add product" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});