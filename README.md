# 📚 Biblioteca Virtual — Versión 1

Proyecto Final Integrador — **Implementación de un Entorno DevOps para una
Aplicación Simple** (Gestión de la Configuración de Software).

Aplicación web de biblioteca virtual construida con **Node.js + Express**,
con almacenamiento en archivos JSON.

## Funcionalidades (Versión 1)

* Registrar libros (título, autor, ISBN).
* Buscar libros por título, autor o ISBN.

## Estructura del proyecto

```
biblioteca-virtual/
├── data/                      # "Base de datos" en JSON
├── public/                    # Frontend (HTML/CSS/JS)
├── src/
│   ├── app.js                 # Configuración de Express
│   ├── db/JSONRepository.js   # Clase reutilizable de persistencia
│   ├── repositories/          # Acceso a datos (libros)
│   ├── services/               # Lógica de negocio
│   ├── routes/                 # Endpoints REST
│   └── utils/validar.js        # Validaciones reutilizables
├── tests/                      # Pruebas automatizadas (Jest)
├── server.js                   # Entry point local
└── package.json
```

## Ejecutar en local

```bash
npm install
npm start
# abrir http://localhost:3000
```

## Ejecutar las pruebas

```bash
npm test
```

## API REST

| Método | Endpoint | Descripción |
|---|---|---|
| GET | `/api/version` | Versión y features activas |
| GET | `/api/libros?q=texto` | Listar / buscar libros |
| POST | `/api/libros` | Registrar un libro |

## Stack técnico

* Node.js + Express
* Almacenamiento en archivos JSON
* Frontend en HTML/CSS/JS puro
* Jest para pruebas automatizadas
