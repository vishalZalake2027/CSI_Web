const express = require('express');
const app = express();
const port = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated data storage (in-memory object)
let inventory = [];

// Route to add a product
app.post('/add-product', (req, res) => {
  const { name, price, quantity } = req.body;
  const newProduct = { name, price, quantity };
  inventory.push(newProduct);
  res.status(201).json(newProduct);
});

// Route to get all products
app.get('/products', (req, res) => {
  res.status(200).json(inventory);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
app.get('/products', (req, res) => {
    Product.find({}, (err, products) => {
      if (err) return res.status(500).send(err);
      res.json(products);
    });
  });
  {
    "scripts": {
      "start": "vite preview",  // For Vite projects, use vite preview to run the production build
      "build": "vite build"
    }
  }
  