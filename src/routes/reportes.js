const express = require('express');
const reporteService = require('../services/reporteService');

const router = express.Router();

// GET /api/reportes -> reporte agregado de la biblioteca (VERSION 2)
router.get('/', (req, res) => {
  res.json(reporteService.generarReporte());
});

module.exports = router;
