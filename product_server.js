const mongoose = require('mongoose');
const Employees = require('./product');

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
app.get('/api/products', async (req, res) => {
  try {
    const documents = await Employees.find();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// POST endpoint for adding an employee
app.post('/api/add_product', async (req, res) => {
  try {
    const data = req.body;
    const product = new Employees({
      emp_name: data.name,
      category: data.category,
      price: data.price
    });

    // Save the employee to the database
    await product.save();
    res.json({ message: 'Employee added successfully' });
  } catch (error) {
    res.status(500).json({ error: "Failed to add employee" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});