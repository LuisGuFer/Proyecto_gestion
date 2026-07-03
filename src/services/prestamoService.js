const prestamoRepository = require('../repositories/prestamoRepository');
const libroRepository = require('../repositories/libroRepository');
const { camposRequeridos } = require('../utils/validar');

/**
 * prestamoService.js
 * Logica de negocio para prestamos.
 * Funcionalidad agregada en la VERSION 2 del sistema (CB-002),
 * solicitada por el cliente para controlar el ciclo de vida de los libros.
 */

function prestarLibro(data) {
  const faltantes = camposRequeridos(data, ['libroId', 'usuario']);
  if (faltantes.length > 0) {
    const error = new Error(`Faltan campos obligatorios: ${faltantes.join(', ')}`);
    error.status = 400;
    throw error;
  }

  const libro = libroRepository.findById(data.libroId);
  if (!libro) {
    const error = new Error('El libro indicado no existe');
    error.status = 404;
    throw error;
  }
  if (!libro.disponible) {
    const error = new Error('El libro no esta disponible para prestamo');
    error.status = 409;
    throw error;
  }

  const prestamo = prestamoRepository.create({
    libroId: libro.id,
    libroTitulo: libro.titulo,
    usuario: data.usuario.trim(),
    fechaPrestamo: new Date().toISOString(),
    fechaDevolucion: null,
    estado: 'activo',
  });

  libroRepository.update(libro.id, { disponible: false });
  return prestamo;
}

function devolverLibro(prestamoId) {
  const prestamo = prestamoRepository.findById(prestamoId);
  if (!prestamo) {
    const error = new Error('El prestamo indicado no existe');
    error.status = 404;
    throw error;
  }
  if (prestamo.estado === 'devuelto') {
    const error = new Error('Este prestamo ya fue devuelto');
    error.status = 409;
    throw error;
  }

  const actualizado = prestamoRepository.update(prestamoId, {
    estado: 'devuelto',
    fechaDevolucion: new Date().toISOString(),
  });

  libroRepository.update(prestamo.libroId, { disponible: true });
  return actualizado;
}

function listarPrestamos() {
  return prestamoRepository.findAll();
}

module.exports = { prestarLibro, devolverLibro, listarPrestamos };
