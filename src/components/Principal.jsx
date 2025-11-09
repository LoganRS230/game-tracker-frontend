import { useEffect, useState } from 'react';
import { getJuegos, getJuegosPorTitulo, getJuegosPorDesarrollador } from '../services/api';
import TargetaJuego from './TargetaJuego';
import BarraBusqueda from './BarraBusqueda';
import { useNavigate } from 'react-router-dom';
import '../styles/Principal.css';

export default function Principal({ usuario }) {
  const [juegos, setJuegos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [modoOscuro, setModoOscuro] = useState(false);
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

  return (
    <div className={`principal ${modoOscuro ? 'oscuro' : ''}`}>
    

      <BarraBusqueda onBuscar={manejarBusqueda} />

      {filtrados.length === 0 ? (
        <div className="sin-juegos">
          <h2>No hay juegos disponibles</h2>
          <button onClick={() => navigate('/ingresar')}>Añadir juego</button>
        </div>
      ) : (
        <div className="collage-juegos">
          {filtrados.map(j => (
            <TargetaJuego key={j._id} juego={j} usuario={usuario} />
          ))}
        </div>
      )}
    </div>
  );
}
