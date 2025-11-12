import { useState } from 'react';
import '../styles/EditarReseñaModal.css';

export default function EditarReseñaModal({ resena, onClose, onResenaActualizada }) {
  const [rating, setRating] = useState(resena.puntuacion);
  const [comentario, setComentario] = useState(resena.comentario);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleActualizar = async () => {
    try {
      setLoading(true);
      setError('');

      if (rating === 0) {
        setError('Por favor selecciona una puntuación');
        setLoading(false);
        return;
      }

      if (comentario.trim() === '') {
        setError('Por favor escribe un comentario');
        setLoading(false);
        return;
      }

      const response = await fetch(`http://localhost:5000/api/resenas/${resena._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comentario: comentario,
          puntuacion: rating
        })
      });

      const data = await response.json();

      if (data.success) {
        alert('Reseña actualizada correctamente');
        onResenaActualizada(data.data);
        onClose();
      } else {
        setError(data.mensaje || 'Error al actualizar la reseña');
      }
    } catch (err) {
      setError(err.message || 'Error al actualizar la reseña');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta reseña?')) {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/resenas/${resena._id}`, {
          method: 'DELETE'
        });

        const data = await response.json();

        if (data.success) {
          alert('Reseña eliminada correctamente');
          onResenaActualizada({ ...resena, _id: null }); // Señal para eliminar
          onClose();
        } else {
          setError(data.mensaje || 'Error al eliminar la reseña');
        }
      } catch (err) {
        setError(err.message || 'Error al eliminar la reseña');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content editar-resena-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        
        <h2>Editar Reseña</h2>
        <h4 style={{ color: '#ff66ff', marginBottom: '1rem' }}>
          {resena.juego?.titulo || 'Juego'}
        </h4>

        {error && <p className="error-message">{error}</p>}
        
        <div className="stars-section">
          <label>Puntuación:</label>
          <div className="stars">
            {[1,2,3,4,5].map((star) => (
              <span
                key={star}
                className={star <= rating ? "star filled" : "star"}
                onClick={() => !loading && setRating(star)}
                style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                ★
              </span>
            ))}
          </div>
          <span className="rating-text">{rating}/5 estrellas</span>
        </div>

        <div className="comentario-section">
          <label>Comentario:</label>
          <textarea
            placeholder="Escribe tu comentario..."
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            disabled={loading}
            rows="5"
          ></textarea>
        </div>

        <div className="modal-actions">
          <button 
            className="btn-actualizar"
            onClick={handleActualizar} 
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
          
          <button 
            className="btn-eliminar"
            onClick={handleEliminar} 
            disabled={loading}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
          
          <button 
            className="btn-cancelar"
            onClick={onClose} 
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
