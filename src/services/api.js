const BASE_URL = 'http://localhost:5000/api'; // Ajusta el puerto si tu backend usa otro

// Helper para manejar errores y respuestas
const fetchJSON = async (url, options = {}) => {
  try {
    const res = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.mensaje || 'Error en la solicitud');
    return data;
  } catch (error) {
    throw error;
  }
};

// Juegos
export const getJuegos = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetchJSON(`${BASE_URL}/juegos?${query}`);
};

export const getJuegoPorId = (id) => fetchJSON(`${BASE_URL}/juegos/${id}`);
export const getJuegosPorTitulo = (titulo) => fetchJSON(`${BASE_URL}/juegos/titulo/${titulo}`);
export const getJuegosPorDesarrollador = (nombre) => fetchJSON(`${BASE_URL}/juegos/desarrollador/${nombre}`);
export const crearJuego = (data) =>
  fetchJSON(`${BASE_URL}/juegos`, { method: 'POST', body: JSON.stringify(data) });
export const actualizarJuego = (id, data) =>
  fetchJSON(`${BASE_URL}/juegos/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const eliminarJuego = (id) =>
  fetchJSON(`${BASE_URL}/juegos/${id}`, { method: 'DELETE' });

// Reseñas
export const crearResena = (data) =>
  fetchJSON(`${BASE_URL}/resenas`, { method: 'POST', body: JSON.stringify(data) });
export const getResenasPorJuego = (juegoId) => fetchJSON(`${BASE_URL}/resenas/juego/${juegoId}`);
export const getResenasPorUsuario = (usuario) => fetchJSON(`${BASE_URL}/resenas/usuario/${usuario}`);
export const actualizarResena = (id, data) =>
  fetchJSON(`${BASE_URL}/resenas/${id}`, { method: 'PUT', body: JSON.stringify(data) });
export const eliminarResena = (id) =>
  fetchJSON(`${BASE_URL}/resenas/${id}`, { method: 'DELETE' });
