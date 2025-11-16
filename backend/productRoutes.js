const express = require('express');
const router = express.Router();
const productStorage = require('./productStorage');

// List products
router.get('/', (req, res) => {
  const result = productStorage.listProducts();
  res.status(200).json(result);
});

// Create product
router.post('/', (req, res) => {
  const { name, description } = req.body;
  const result = productStorage.createProduct(name, description);
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
});

// Update product
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const result = productStorage.updateProduct(id, { name, description });
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
});

// Delete product
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const result = productStorage.deleteProduct(id);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
});

module.exports = router;
