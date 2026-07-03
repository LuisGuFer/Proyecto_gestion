/**
 * utils/validar.js
 * Funciones REUTILIZABLES de validacion. Se usan tanto en libroService
 * como en prestamoService, evitando repetir la misma logica dos veces.
 */

function camposRequeridos(data, campos) {
  const faltantes = campos.filter((campo) => {
    const valor = data[campo];
    return valor === undefined || valor === null || String(valor).trim() === '';
  });
  return faltantes;
}

function normalizarTexto(texto) {
  return String(texto || '').trim().toLowerCase();
}

module.exports = { camposRequeridos, normalizarTexto };
