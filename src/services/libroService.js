const libroRepository = require('../repositories/libroRepository');
const { camposRequeridos, normalizarTexto } = require('../utils/validar');

/**
 * libroService.js
 * Logica de negocio para libros.
 * VERSION 1 del sistema: registrar libros y buscar libros.
 */

function registrarLibro(data) {
  const faltantes = camposRequeridos(data, ['titulo', 'autor', 'isbn']);
  if (faltantes.length > 0) {
    const error = new Error(`Faltan campos obligatorios: ${faltantes.join(', ')}`);
    error.status = 400;
    throw error;
  }

  const libro = {
    titulo: data.titulo.trim(),
    autor: data.autor.trim(),
    isbn: data.isbn.trim(),
    disponible: true,
  };

  return libroRepository.create(libro);
}

function listarLibros() {
  return libroRepository.findAll();
}

function buscarLibros(query) {
  const termino = normalizarTexto(query);
  if (!termino) return listarLibros();

  return libroRepository
    .findAll()
    .filter(
      (libro) =>
        normalizarTexto(libro.titulo).includes(termino) ||
        normalizarTexto(libro.autor).includes(termino) ||
        normalizarTexto(libro.isbn).includes(termino)
    );
}

function obtenerLibro(id) {
  return libroRepository.findById(id);
}

module.exports = { registrarLibro, listarLibros, buscarLibros, obtenerLibro };
