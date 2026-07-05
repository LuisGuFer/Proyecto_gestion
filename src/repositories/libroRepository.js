const path = require('path');
const JSONRepository = require('../db/JSONRepository');
const { resolveWritablePath } = require('../db/resolveWritablePath');

// Reutilizacion: misma clase JSONRepository, distinta data -> libros.json
const bundledPath = path.join(__dirname, '..', '..', 'data', 'libros.json');
const libroRepository = new JSONRepository(resolveWritablePath(bundledPath));

module.exports = libroRepository;
