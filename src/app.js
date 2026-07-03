const express = require('express');
const path = require('path');

const librosRouter = require('./routes/libros');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/libros', librosRouter);

app.get('/api/version', (req, res) => {
  res.json({
    version: '1',
    features: ['registrar-libros', 'buscar-libros'],
  });
});

module.exports = app;
