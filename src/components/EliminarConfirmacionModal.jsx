import '../styles/EliminarConfirmacionModal.css';

export default function EliminarConfirmacionModal({ juego, onClose }) {
  const handleEliminar = () => {
    console.log("Juego eliminado:", juego._id);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content eliminar-modal">
        <h3>¿Está seguro/a que quiere eliminar este juego?</h3>
        <div className="modal-actions">
          <button className="eliminar-btn" onClick={handleEliminar}>Eliminar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}
