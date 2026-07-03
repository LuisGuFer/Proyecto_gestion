const express = require('express');
const libroService = require('../services/libroService');

const router = express.Router();

// GET /api/libros?q=texto  -> listar o buscar (VERSION 1)
router.get('/', (req, res) => {
  const { q } = req.query;
  const libros = q ? libroService.buscarLibros(q) : libroService.listarLibros();
  res.json(libros);
});

// POST /api/libros -> registrar libro (VERSION 1)
router.post('/', (req, res) => {
  try {
    const libro = libroService.registrarLibro(req.body);
    res.status(201).json(libro);
  } catch (err) {
    res.status(err.status || 500).json({ error: err.message });
  }
});

module.exports = router;
