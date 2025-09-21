const express = require('express');
const cors = require('cors');
const path = require('path');
const contactsRouter = require('./routes/contacts');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRouter);

app.get('/', (req, res) => {
  res.json({ message: 'Contact Book API running' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});