// Punto de entrada para el despliegue serverless en Vercel.
// Vercel ejecuta este archivo como una funcion; reutiliza la misma
// app de Express que se usa en local (server.js), sin duplicar codigo.
const app = require('../src/app');

module.exports = app;