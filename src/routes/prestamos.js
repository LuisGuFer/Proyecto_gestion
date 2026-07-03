const express = require('express');
const prestamoService = require('../services/prestamoService');

const router = express.Router();

// GET /api/prestamos -> listar prestamos (VERSION 2)
router.get('/', (req, res) => {
  res.json(prestamoService.listarPrestamos());
});

// POST /api/prestamos -> registrar un prestamo (VERSION 2)
router.post('/', (req, res) => {
  try {
    const prestamo = prestamoService.prestarLibro(req.body);
    res.status(201).json(prestamo);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

// PUT /api/prestamos/:id/devolver -> devolver un libro (VERSION 2)
router.put('/:id/devolver', (req, res) => {
  try {
    const prestamo = prestamoService.devolverLibro(req.params.id);
    res.json(prestamo);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;
