import { useEffect, useState } from 'react';
import { getJuegos, getJuegosPorTitulo, getJuegosPorDesarrollador } from '../services/api';
import TargetaJuego from './TargetaJuego';
import BarraBusqueda from './BarraBusqueda';
import JuegoModal from './JuegoModal';
import { useNavigate } from 'react-router-dom';
import '../styles/Principal.css';

export default function Principal({ usuario }) {
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [juegos, setJuegos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getJuegos({ page: 1, limit: 100, orden: 'mejor' })
      .then(res => {
        setJuegos(res.data);
        setFiltrados(res.data);
      })
      .catch(err => console.error(err.message));
  }, []);

  const manejarBusqueda = async (modo, texto) => {
    try {
      const res = modo === 'titulo'
        ? await getJuegosPorTitulo(texto)
        : await getJuegosPorDesarrollador(texto);
      setFiltrados(res.data);
    } catch (err) {
      setFiltrados([]);
    }
  };

  // 🔹 Nuevo: manejar toggle de completado
  const manejarToggleCompleto = (id, nuevoEstado) => {
    setJuegos(prev =>
      prev.map(j => j._id === id ? { ...j, completado: nuevoEstado } : j)
    );
    setFiltrados(prev =>
      prev.map(j => j._id === id ? { ...j, completado: nuevoEstado } : j)
    );
    // También actualizamos el juego seleccionado si está abierto
    if (juegoSeleccionado && juegoSeleccionado._id === id) {
      setJuegoSeleccionado({ ...juegoSeleccionado, completado: nuevoEstado });
    }
  };

  return (
    <div className="principal">
      <BarraBusqueda
        onBuscar={manejarBusqueda}
        onLimpiar={() => setFiltrados(juegos)}
      />

      {filtrados.length === 0 ? (
        <div className="sin-juegos">
          <h2>No hay juegos disponibles</h2>
          <button onClick={() => navigate('/ingresar')}>Añadir juego</button>
        </div>
      ) : (
        <div className="collage-juegos">
          {filtrados.map((j) => (
            <div key={j._id} onClick={() => setJuegoSeleccionado(j)}>
              <TargetaJuego juego={j} />
            </div>
          ))}

          {juegoSeleccionado && (
            <JuegoModal
              juego={juegoSeleccionado}
              onClose={() => setJuegoSeleccionado(null)}
              onToggleCompleto={manejarToggleCompleto} // 🔹 pasamos función
            />
          )}
        </div>
      )}
    </div>
  );
}
