const fs = require('fs');
const os = require('os');
const path = require('path');

/**
 * resolveWritablePath.js
 * ----------------------
 * En Vercel (y en entornos serverless en general) el sistema de archivos
 * del proyecto es de SOLO LECTURA salvo el directorio del sistema
 * operativo `/tmp`. Como este proyecto usa archivos JSON como "base de
 * datos" (pensado para ejecutarse en un servidor tradicional), necesita
 * un ajuste para poder escribir cuando corre en Vercel.
 *
 * Esta funcion decide, segun el entorno, en que ruta debe leer/escribir
 * cada repositorio:
 *
 *  - En local o en un servidor tradicional (Render, Railway, VPS, etc.):
 *    usa el archivo real dentro de data/, tal como siempre.
 *
 *  - En Vercel (variable de entorno VERCEL=1): copia el archivo original
 *    (de solo lectura) a `/tmp` la primera vez, y a partir de ahi lee y
 *    escribe en esa copia temporal.
 *
 * IMPORTANTE (limitacion conocida, ver docs/despliegue-continuo.md):
 * los archivos en /tmp NO son permanentes. Sobreviven mientras la misma
 * instancia de la funcion siga "caliente", pero se pierden en un
 * cold start o en un nuevo despliegue. Para persistencia real en
 * produccion se recomienda migrar a una base de datos administrada
 * (ej. Vercel Postgres, Supabase, MongoDB Atlas).
 */
function resolveWritablePath(bundledPath) {
  if (!process.env.VERCEL) {
    return bundledPath;
  }

  const tmpPath = path.join(os.tmpdir(), path.basename(bundledPath));

  if (!fs.existsSync(tmpPath)) {
    try {
      fs.copyFileSync(bundledPath, tmpPath);
    } catch (err) {
      fs.writeFileSync(tmpPath, '[]', 'utf-8');
    }
  }

  return tmpPath;
}

module.exports = { resolveWritablePath };