const path = require('path');
const JSONRepository = require('../db/JSONRepository');

// Reutilizacion: misma clase JSONRepository, distinta data -> libros.json
const libroRepository = new JSONRepository(
  path.join(__dirname, '..', '..', 'data', 'libros.json')
);

module.exports = libroRepository;
