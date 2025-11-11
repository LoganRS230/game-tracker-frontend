import { useState, useEffect } from 'react';
import { getResenasPorJuego } from '../services/api';
import '../styles/ComentariosModal.css';

export default function ComentariosModal({ juego, onClose }) {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    obtenerComentarios();
  }, [juego._id]);

  const obtenerComentarios = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await getResenasPorJuego(juego._id);
      
      if (response.success) {
        setComentarios(response.data);
      } else {
        setError(response.mensaje || "Error al obtener comentarios");
      }
    } catch (error) {
      setError(error.message || "Error al obtener comentarios");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content comentarios-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3>Comentarios de {juego.titulo}</h3>
        
        {error && <p className="error-message">{error}</p>}
        
        {loading ? (
          <p className="loading">Cargando comentarios...</p>
        ) : comentarios.length > 0 ? (
          <ul>
            {comentarios.map((c, i) => (
              <li key={i} className="comentario-item">
                <div className="comentario-header">
                  <span className="estrellas">{"★".repeat(c.puntuacion)}</span>
                  <span className="usuario">{c.usuario}</span>
                </div>
                <p className="comentario-texto">{c.comentario}</p>
                <span className="comentario-fecha">
                  {new Date(c.fecha).toLocaleDateString('es-ES')}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="sin-comentarios">No hay comentarios aún. ¡Sé el primero en comentar!</p>
        )}
      </div>
    </div>
  );
}