import { useEffect, useState } from 'react';
import { getResenasPorUsuario, getJuegoPorId } from '../services/api';
import TargetaJuego from './TargetaJuego';
import '../styles/MisResenas.css';

export default function MisResenas({ usuario }) {
  const [resenas, setResenas] = useState([]);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

  useEffect(() => {
    getResenasPorUsuario(usuario)
      .then(res => setResenas(res.data))
      .catch(err => console.error(err.message));
  }, [usuario]);

  const verJuego = async (juegoId) => {
    try {
      const res = await getJuegoPorId(juegoId);
      setJuegoSeleccionado(res.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="mis-resenas">
      <h2>Mis Reseñas</h2>
      {resenas.map(r => (
        <div key={r._id} className="resena-item">
          <span className="resena-id" onClick={() => verJuego(r.juegoId)}>🎮 {r.juegoId}</span> — <strong>{r.usuario}</strong>: {r.comentario} ({r.puntuacion}/5)
        </div>
      ))}
      {juegoSeleccionado && (
        <div className="juego-preview">
          <TargetaJuego juego={juegoSeleccionado} usuario={usuario} />
        </div>
      )}
    </div>
  );
}
