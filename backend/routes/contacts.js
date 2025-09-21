const express = require('express');
const router = express.Router();
const model = require('../models/contactModel');

router.post('/', (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || name.trim().length < 1) {
    return res.status(400).json({ error: 'Name is required' });
  }
  model.createContact({ name: name.trim(), email, phone }, (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.status(201).json({ id: result.id, name, email, phone });
  });
});

router.get('/', (req, res) => {
  const page = parseInt(req.query.page || '1', 10);
  const limit = parseInt(req.query.limit || '10', 10);
  model.getContacts(page, limit, (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    res.json(result);
  });
});

router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (!id) return res.status(400).json({ error: 'Invalid id' });
  model.deleteContact(id, (err, result) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (result.changes === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ success: true });
  });
});

module.exports = router;