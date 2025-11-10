import { useState } from 'react';
import imagenPorDefecto from '../assets/pordefecto.jpg';
import '../styles/JuegoModal.css';

// Importamos los submodales
import EditarJuegoModal from './EditarJuegoModal';
import ReseñaModal from './ReseñaModal';
import EliminarConfirmacionModal from './EliminarConfirmacionModal';
import ComentariosModal from './ComentariosModal';

export default function JuegoModal({ juego, onClose, onToggleCompleto }) {
  if (!juego) return null;

  const [abrirEditar, setAbrirEditar] = useState(false);
  const [abrirReseña, setAbrirReseña] = useState(false);
  const [abrirEliminar, setAbrirEliminar] = useState(false);
  const [abrirComentarios, setAbrirComentarios] = useState(false);

  // Estado para el slider de completo/incompleto
  const [completo, setCompleto] = useState(juego.completado || false);

  const portada = juego.imagenPortada && juego.imagenPortada.trim() !== ''
    ? juego.imagenPortada
    : imagenPorDefecto;

  const handleToggle = () => {
    const nuevoEstado = !completo;
    setCompleto(nuevoEstado);
    if (onToggleCompleto) {
      onToggleCompleto(juego._id, nuevoEstado); // 🔹 avisamos al padre
    }
  };

  return (
    <>
      {/* Modal principal */}
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>✖</button>

          <img
            src={portada}
            alt={juego.titulo}
            className="modal-img"
            onError={(e) => { e.target.src = imagenPorDefecto; }}
          />

          {/* Línea superior: tags + año + slider */}
          <div className="modal-top">
            <div className="modal-tags">
              <span className={`tag ${juego.genero?.toLowerCase() || 'default'}`}>
                {juego.genero}
              </span>
              <span className="tag anio">{juego.añoLanzamiento}</span>
            </div>

            {/* Slider de estado */}
            <div className="estado-toggle">
              <label className="switch">
                <input
                  type="checkbox"
                  checked={completo}
                  onChange={handleToggle}
                />
                <span className="slider"></span>
              </label>
              <span className={`estado-text ${completo ? 'completo' : 'incompleto'}`}>
                {completo ? 'Completo' : 'Incompleto'}
              </span>
            </div>
          </div>

          {/* Título centralizado */}
          <h2 className="modal-title">{juego.titulo}</h2>

          {/* Info alineada a la izquierda */}
          <div className="modal-info">
            <p><strong>Desarrollador:</strong> {juego.desarrollador}</p>
            <p><strong>Plataforma:</strong> {juego.plataforma}</p>
            <p><strong>Descripción:</strong> {juego.descripcion || 'Sin descripción'}</p>
          </div>

          <div className="modal-actions">
            <button onClick={() => setAbrirEditar(true)}>Editar</button>
            <button onClick={() => setAbrirReseña(true)}>Reseñar</button>
            <button className="comentarios-btn" onClick={() => setAbrirComentarios(true)}>Ver comentarios</button>
            <button className="eliminar-btn" onClick={() => setAbrirEliminar(true)}>Eliminar</button>
          </div>
        </div>
      </div>

      {/* Submodales independientes */}
      {abrirEditar && (
        <EditarJuegoModal juego={juego} onClose={() => setAbrirEditar(false)} />
      )}
      {abrirReseña && (
        <ReseñaModal juego={juego} onClose={() => setAbrirReseña(false)} />
      )}
      {abrirEliminar && (
        <EliminarConfirmacionModal juego={juego} onClose={() => setAbrirEliminar(false)} />
      )}
      {abrirComentarios && (
        <ComentariosModal juego={juego} onClose={() => setAbrirComentarios(false)} />
      )}
    </>
  );
}
