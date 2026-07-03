const fs = require('fs');
const path = require('path');

/**
 * JSONRepository
 * ----------------
 * Clase GENERICA y REUTILIZABLE para persistir cualquier tipo de entidad
 * en un archivo JSON. No sabe nada de "libros" ni "prestamos": solo sabe
 * leer/escribir arreglos de objetos con un campo "id".
 *
 * Este es el ejemplo principal de REUTILIZACION DE SOFTWARE del proyecto:
 * la misma clase se instancia dos veces (libroRepository y
 * prestamoRepository) sin duplicar codigo. Tambien implementa el
 * patron de diseno "Repository", que separa el acceso a datos del
 * resto de la logica de negocio (services/routes).
 */
class JSONRepository {
  constructor(filePath) {
    this.filePath = filePath;
    this._ensureFile();
  }

  _ensureFile() {
    const dir = path.dirname(this.filePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, '[]', 'utf-8');
    }
  }

  _readAll() {
    const raw = fs.readFileSync(this.filePath, 'utf-8');
    try {
      return JSON.parse(raw || '[]');
    } catch (e) {
      return [];
    }
  }

  _writeAll(items) {
    fs.writeFileSync(this.filePath, JSON.stringify(items, null, 2), 'utf-8');
  }

  _generarId(items) {
    const maxId = items.reduce((max, item) => Math.max(max, item.id || 0), 0);
    return maxId + 1;
  }

  findAll() {
    return this._readAll();
  }

  findById(id) {
    return this._readAll().find((item) => item.id === Number(id)) || null;
  }

  create(data) {
    const items = this._readAll();
    const nuevo = { id: this._generarId(items), ...data };
    items.push(nuevo);
    this._writeAll(items);
    return nuevo;
  }

  update(id, data) {
    const items = this._readAll();
    const index = items.findIndex((item) => item.id === Number(id));
    if (index === -1) return null;
    items[index] = { ...items[index], ...data };
    this._writeAll(items);
    return items[index];
  }

  delete(id) {
    const items = this._readAll();
    const filtrados = items.filter((item) => item.id !== Number(id));
    this._writeAll(filtrados);
    return filtrados.length !== items.length;
  }
}

module.exports = JSONRepository;
