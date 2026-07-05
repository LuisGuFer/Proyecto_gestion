const path = require('path');
const JSONRepository = require('../db/JSONRepository');
const { resolveWritablePath } = require('../db/resolveWritablePath');

// Reutilizacion: misma clase JSONRepository, distinta data -> prestamos.json
// Esta entidad pertenece a la VERSION 2 del sistema (gestion de prestamos).
const bundledPath = path.join(__dirname, '..', '..', 'data', 'prestamos.json');
const prestamoRepository = new JSONRepository(resolveWritablePath(bundledPath));

module.exports = prestamoRepository;