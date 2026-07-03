const libroRepository = require('../repositories/libroRepository');
const prestamoRepository = require('../repositories/prestamoRepository');

/**
 * reporteService.js
 * Funcionalidad agregada en la VERSION 2 del sistema (CB-002):
 * generar reportes agregados sobre el estado de la biblioteca.
 */

function generarReporte() {
  const libros = libroRepository.findAll();
  const prestamos = prestamoRepository.findAll();

  const librosDisponibles = libros.filter((l) => l.disponible).length;
  const prestamosActivos = prestamos.filter((p) => p.estado === 'activo').length;

  return {
    totalLibros: libros.length,
    librosDisponibles,
    librosPrestados: libros.length - librosDisponibles,
    totalPrestamosHistorico: prestamos.length,
    prestamosActivos,
    prestamosDevueltos: prestamos.length - prestamosActivos,
    generadoEn: new Date().toISOString(),
  };
}

module.exports = { generarReporte };
