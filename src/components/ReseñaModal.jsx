import { useState } from 'react';
import '../styles/ReseñaModal.css';

export default function ReseñaModal({ juego, onClose }) {
  const [rating, setRating] = useState(0);
  const [comentario, setComentario] = useState("");

  const handlePublicar = () => {
    console.log("Reseña publicada:", { rating, comentario });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content reseña-modal">
        <h3>Reseñar {juego.titulo}</h3>
        
        <div className="stars">
          {[1,2,3,4,5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star filled" : "star"}
              onClick={() => setRating(star)}
            >★</span>
          ))}
        </div>

        <textarea
          placeholder="Escribe tu comentario..."
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        ></textarea>

        <div className="modal-actions">
          <button onClick={handlePublicar}>Publicar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
