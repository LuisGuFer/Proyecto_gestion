const fs = require('fs');
const path = require('path');

// Usamos archivos JSON temporales para no ensuciar data/ durante los tests
const TEST_DIR = path.join(__dirname, '__tmp__');
process.env.NODE_ENV = 'test';

beforeAll(() => {
  if (!fs.existsSync(TEST_DIR)) fs.mkdirSync(TEST_DIR);
});

afterAll(() => {
  fs.rmSync(TEST_DIR, { recursive: true, force: true });
});

const JSONRepository = require('../src/db/JSONRepository');

describe('JSONRepository (clase reutilizable)', () => {
  const filePath = path.join(TEST_DIR, 'items.json');

  test('crea y recupera elementos asignando id incremental', () => {
    const repo = new JSONRepository(filePath);
    const a = repo.create({ nombre: 'A' });
    const b = repo.create({ nombre: 'B' });

    expect(a.id).toBe(1);
    expect(b.id).toBe(2);
    expect(repo.findAll()).toHaveLength(2);
    expect(repo.findById(a.id).nombre).toBe('A');
  });

  test('actualiza y elimina elementos', () => {
    const repo = new JSONRepository(filePath);
    const item = repo.create({ nombre: 'C' });

    const actualizado = repo.update(item.id, { nombre: 'C-modificado' });
    expect(actualizado.nombre).toBe('C-modificado');

    const eliminado = repo.delete(item.id);
    expect(eliminado).toBe(true);
    expect(repo.findById(item.id)).toBeNull();
  });
});

describe('libroService (Version 1: registrar y buscar)', () => {
  const realDataFile = path.join(__dirname, '..', 'data', 'libros.json');
  let backup;
  let libroService;

  beforeAll(() => {
    backup = fs.readFileSync(realDataFile, 'utf-8');
  });

  afterAll(() => {
    fs.writeFileSync(realDataFile, backup);
  });

  beforeEach(() => {
    fs.writeFileSync(realDataFile, '[]');
    jest.resetModules();
    libroService = require('../src/services/libroService');
  });

  test('registra un libro válido', () => {
    const libro = libroService.registrarLibro({
      titulo: 'El Quijote',
      autor: 'Cervantes',
      isbn: '123',
    });
    expect(libro.id).toBeDefined();
    expect(libro.disponible).toBe(true);
  });

  test('rechaza un libro sin campos obligatorios', () => {
    expect(() => libroService.registrarLibro({ titulo: 'Sin autor' })).toThrow();
  });

  test('busca libros por coincidencia parcial de título o autor', () => {
    libroService.registrarLibro({ titulo: 'Rayuela', autor: 'Julio Cortázar', isbn: '1' });
    libroService.registrarLibro({ titulo: 'Ficciones', autor: 'Jorge Luis Borges', isbn: '2' });

    const resultados = libroService.buscarLibros('borges');
    expect(resultados).toHaveLength(1);
    expect(resultados[0].titulo).toBe('Ficciones');
  });
});
