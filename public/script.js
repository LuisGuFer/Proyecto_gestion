// ---------------------------------------------------------------------
// script.js — Frontend de Biblioteca Virtual (Version 1: solo catálogo)
// Consume la API REST expuesta por src/app.js.
// ---------------------------------------------------------------------

async function cargarVersion() {
  const res = await fetch('/api/version');
  const data = await res.json();
  document.getElementById('version-badge').textContent = `v${data.version} · ${data.features.join(' · ')}`;
}

// ----------------------- Catálogo -----------------------
const catalogoGrid = document.getElementById('catalogo-grid');
const formLibro = document.getElementById('form-libro');
const msgLibro = document.getElementById('msg-libro');
const buscarInput = document.getElementById('buscar-input');

function renderLibros(libros) {
  catalogoGrid.innerHTML = libros
    .map(
      (l) => `
      <article class="book-card">
        <span class="book-card__estado book-card__estado--${l.disponible ? 'disponible' : 'prestado'}">
          ${l.disponible ? 'Disponible' : 'Prestado'}
        </span>
        <h3 class="book-card__title">${l.titulo}</h3>
        <p class="book-card__autor">${l.autor}</p>
        <p class="book-card__isbn">ISBN ${l.isbn}</p>
      </article>`
    )
    .join('');
}

async function cargarLibros(query = '') {
  const url = query ? `/api/libros?q=${encodeURIComponent(query)}` : '/api/libros';
  const res = await fetch(url);
  const libros = await res.json();
  renderLibros(libros);
  return libros;
}

formLibro.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(formLibro).entries());
  const res = await fetch('/api/libros', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const body = await res.json();
  if (res.ok) {
    msgLibro.textContent = `"${body.titulo}" registrado correctamente.`;
    formLibro.reset();
    cargarLibros(buscarInput.value);
  } else {
    msgLibro.textContent = body.error || 'Ocurrió un error.';
  }
});

let buscarTimeout;
buscarInput.addEventListener('input', () => {
  clearTimeout(buscarTimeout);
  buscarTimeout = setTimeout(() => cargarLibros(buscarInput.value), 200);
});

// ----------------------- Inicio -----------------------
(async function init() {
  await cargarVersion();
  await cargarLibros();
})();
