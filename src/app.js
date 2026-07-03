const express = require('express');
const path = require('path');

const librosRouter = require('./routes/libros');
const prestamosRouter = require('./routes/prestamos');
const reportesRouter = require('./routes/reportes');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api/libros', librosRouter);
app.use('/api/prestamos', prestamosRouter);
app.use('/api/reportes', reportesRouter);

app.get('/api/version', (req, res) => {
  res.json({
    version: '2',
    features: ['registrar-libros', 'buscar-libros', 'prestamos', 'reportes'],
  });
});

module.exports = app;