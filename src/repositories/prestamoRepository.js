const path = require('path');
const JSONRepository = require('../db/JSONRepository');

// Reutilizacion: misma clase JSONRepository, distinta data -> prestamos.json
// Esta entidad pertenece a la VERSION 2 del sistema (gestion de prestamos).
const prestamoRepository = new JSONRepository(
  path.join(__dirname, '..', '..', 'data', 'prestamos.json')
);

module.exports = prestamoRepository;
