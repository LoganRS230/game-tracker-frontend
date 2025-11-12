import { useState, useEffect } from 'react';
import { getResenasPorJuego } from '../services/api';
import '../styles/ComentariosModal.css';
import EditarReseñaModal from './EditarReseñaModal';

export default function ComentariosModal({ juego, onClose }) {
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comentarioEnEdicion, setComentarioEnEdicion] = useState(null);
  const usuarioActual = 'LoganGRS230';

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

  const actualizarComentario = (comentarioActualizado) => {
    if (!comentarioActualizado._id) {
      // Fue eliminado
      setComentarios(comentarios.filter(c => c._id !== comentarioActualizado._id));
    } else {
      setComentarios(comentarios.map(c => 
        c._id === comentarioActualizado._id ? { ...c, ...comentarioActualizado } : c
      ));
    }
    setComentarioEnEdicion(null);
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
          <div className="comentarios-list">
            {comentarios.map((c) => (
              <div key={c._id} className="comentario-item">
                <div className="comentario-header">
                  <span className="estrellas">
                    {'★'.repeat(c.puntuacion)}{'☆'.repeat(5 - c.puntuacion)}
                  </span>
                  <span className="usuario">{c.usuario}</span>
                  <span className="puntuacion">({c.puntuacion}/5)</span>
                </div>
                <p className="comentario-texto">{c.comentario}</p>
                <div className="comentario-footer">
                  <span className="comentario-fecha">
                    {new Date(c.fecha).toLocaleDateString('es-ES')}
                  </span>
                  {c.usuario === usuarioActual && (
                    <button 
                      className="btn-editar-comentario"
                      onClick={() => setComentarioEnEdicion(c)}
                      title="Editar comentario"
                    >
                      ✏️ Editar
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="sin-comentarios">No hay comentarios aún. ¡Sé el primero en comentar!</p>
        )}
      </div>

      {comentarioEnEdicion && (
        <EditarReseñaModal
          resena={comentarioEnEdicion}
          onClose={() => setComentarioEnEdicion(null)}
          onResenaActualizada={actualizarComentario}
        />
      )}
    </div>
  );
}