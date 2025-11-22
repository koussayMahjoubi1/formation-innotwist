const express = require('express');
const router = express.Router();
const staffStorage = require('./staffStorage');

router.get('/', (req, res) => {
  const result = staffStorage.listStaff();
  res.status(200).json(result);
});

router.post('/', (req, res) => {
  const { name, email, phone, address } = req.body;
  const result = staffStorage.createStaff(name, email, phone, address);
  if (result.success) {
    res.status(201).json(result);
  } else {
    res.status(400).json(result);
  }
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, phone, address } = req.body;
  const result = staffStorage.updateStaff(id, { name, email, phone, address });
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const result = staffStorage.deleteStaff(id);
  if (result.success) {
    res.status(200).json(result);
  } else {
    res.status(404).json(result);
  }
});

module.exports = router;

