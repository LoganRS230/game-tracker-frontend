import { useState } from 'react';
import { eliminarJuego } from '../services/api';
import '../styles/EliminarConfirmacionModal.css';

export default function EliminarConfirmacionModal({ juego, onClose, onJuegoEliminado }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEliminar = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await eliminarJuego(juego._id);

      if (response.success) {
        if (onJuegoEliminado) {
          onJuegoEliminado(juego._id);
        }
        onClose();
      } else {
        setError(response.mensaje || "Error al eliminar el juego");
      }
    } catch (error) {
      setError(error.message || "Error al eliminar el juego");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content eliminar-modal">
        <h3>¿Está seguro/a que quiere eliminar este juego?</h3>
        {error && <p className="error-message">{error}</p>}
        <p className="warning-text">Esta acción es irreversible.</p>
        <div className="modal-actions">
          <button className="eliminar-btn" onClick={handleEliminar} disabled={loading}>
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
          <button onClick={onClose} disabled={loading}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
