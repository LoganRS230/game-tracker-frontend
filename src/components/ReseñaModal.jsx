import { useState } from 'react';
import { crearResena } from '../services/api';
import '../styles/ReseñaModal.css';

export default function ReseñaModal({ juego, onClose, onResenaCreada }) {
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePublicar = async () => {
    try {
      setLoading(true);
      setError("");

      if (rating === 0) {
        setError("Por favor selecciona una puntuación");
        setLoading(false);
        return;
      }

      if (comentario.trim() === "") {
        setError("Por favor escribe un comentario");
        setLoading(false);
        return;
      }

      const resenaData = {
        juegoId: juego._id,
        usuario: "LoganGRS230",
        comentario: comentario,
        puntuacion: rating
      };

      const response = await crearResena(resenaData);

      if (response.success) {
        if (onResenaCreada) {
          onResenaCreada(response.data);
        }
        onClose();
      } else {
        setError(response.mensaje || "Error al crear la reseña");
      }
    } catch (error) {
      setError(error.message || "Error al crear la reseña");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content reseña-modal">
        <h3>Reseñar {juego.titulo}</h3>
        {error && <p className="error-message">{error}</p>}
        
        <div className="stars">
          {[1,2,3,4,5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star filled" : "star"}
              onClick={() => !loading && setRating(star)}
              style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
            >★</span>
          ))}
        </div>

        <textarea
          placeholder="Escribe tu comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          disabled={loading}
        ></textarea>

        <div className="modal-actions">
          <button onClick={handlePublicar} disabled={loading}>
            {loading ? "Publicando..." : "Publicar"}
          </button>
          <button onClick={onClose} disabled={loading}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
