import { useState } from 'react';
import imagenPorDefecto from '../assets/pordefecto.jpg';
import '../styles/JuegoModal.css';

// Importamos los submodales
import EditarJuegoModal from './EditarJuegoModal';
import ReseñaModal from './ReseñaModal';
import EliminarConfirmacionModal from './EliminarConfirmacionModal';
import ComentariosModal from './ComentariosModal';
import HorasJugadas from './HorasJugadas';

export default function JuegoModal({ juego, onClose, onToggleCompleto, onJuegoActualizado, onJuegoEliminado }) {
  if (!juego) return null;

  const [abrirEditar, setAbrirEditar] = useState(false);
  const [abrirReseña, setAbrirReseña] = useState(false);
  const [abrirEliminar, setAbrirEliminar] = useState(false);
  const [abrirComentarios, setAbrirComentarios] = useState(false);
  const [abrirCambiarImagen, setAbrirCambiarImagen] = useState(false);

  // Estado para el slider de completo/incompleto
  const [completo, setCompleto] = useState(juego.completado || false);
  // Estado reactivo del juego para reflejar cambios
  const [juegoActual, setJuegoActual] = useState(juego);
  
  // Estados para cambiar imagen
  const [urlImagenNueva, setUrlImagenNueva] = useState('');
  const [cargandoImagen, setCargandoImagen] = useState(false);

  const isValidImageUrl = (url) => {
    if (!url || !url.trim()) return false;
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch (err) {
      return false;
    }
  };

  const portada = isValidImageUrl(juegoActual.imagenPortada)
    ? juegoActual.imagenPortada
    : imagenPorDefecto;

  const handleToggle = () => {
    const nuevoEstado = !completo;
    setCompleto(nuevoEstado);
    if (onToggleCompleto) {
      onToggleCompleto(juegoActual._id, nuevoEstado);
    }
  };

  const handleJuegoActualizado = (juegoActualizado) => {
    setJuegoActual(juegoActualizado);
    if (onJuegoActualizado) {
      onJuegoActualizado(juegoActualizado);
    }
  };

  const handleJuegoEliminado = (juegoId) => {
    if (onJuegoEliminado) {
      onJuegoEliminado(juegoId);
    }
    onClose();
  };

  const handleCambiarImagen = async () => {
    if (!isValidImageUrl(urlImagenNueva)) {
      alert('URL de imagen inválida. Debe comenzar con http:// o https://');
      return;
    }

    setCargandoImagen(true);
    try {
      const response = await fetch(`http://localhost:5000/api/juegos/${juegoActual._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          imagenPortada: urlImagenNueva
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la imagen');
      }

      const juegoActualizado = await response.json();
      setJuegoActual(juegoActualizado);
      setUrlImagenNueva('');
      setAbrirCambiarImagen(false);
      
      if (onJuegoActualizado) {
        onJuegoActualizado(juegoActualizado);
      }
      
      alert('Imagen actualizada correctamente');
    } catch (error) {
      console.error('Error:', error);
      alert('Error al actualizar la imagen. Verifica que la URL sea accesible.');
    } finally {
      setCargandoImagen(false);
    }
  };

  return (
    <>
      {/* Modal principal */}
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>✖</button>

          <div 
            style={{ cursor: 'pointer', position: 'relative' }}
            onClick={() => setAbrirCambiarImagen(true)}
            title="Click para cambiar imagen"
          >
            <img
              src={portada}
              alt={juego.titulo}
              className="modal-img"
              onError={(e) => { 
                if (e.target.src !== imagenPorDefecto) {
                  e.target.src = imagenPorDefecto;
                }
              }}
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '5px',
              opacity: 0,
              transition: 'opacity 0.3s',
            }}
            onMouseEnter={(e) => e.target.style.opacity = '1'}
            onMouseLeave={(e) => e.target.style.opacity = '0'}
            >
              📷 Cambiar imagen
            </div>
          </div>

          {/* Línea superior: tags + año + slider */}
          <div className="modal-top">
            <div className="modal-tags">
              <span className={`tag ${juegoActual.genero?.toLowerCase() || 'default'}`}>
                {juegoActual.genero}
              </span>
              <span className="tag anio">{juegoActual.añoLanzamiento}</span>
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

          {/* Añadimos control de horas jugadas (editable, localStorage) */}
          <div style={{ padding: '0 24px 18px 24px' }}>
            <label style={{ display: 'block', marginBottom: '6px', color: '#333', fontWeight: 600 }}>Horas jugadas</label>
            <HorasJugadas juego={juegoActual} max={2000} onChange={() => { /* valor guardado en localStorage */ }} />
          </div>

          {/* Título centralizado */}
          <h2 className="modal-title">{juegoActual.titulo}</h2>

          {/* Info alineada a la izquierda */}
          <div className="modal-info">
            <p><strong>Desarrollador:</strong> {juegoActual.desarrollador}</p>
            <p><strong>Plataforma:</strong> {juegoActual.plataforma}</p>
            <p><strong>Descripción:</strong> {juegoActual.descripcion || 'Sin descripción'}</p>
          </div>

          <div className="modal-actions">
            <button onClick={() => setAbrirEditar(true)}>Editar</button>
            <button onClick={() => setAbrirReseña(true)}>Reseñar</button>
            <button className="comentarios-btn" onClick={() => setAbrirComentarios(true)}>Ver comentarios</button>
            <button className="eliminar-btn" onClick={() => setAbrirEliminar(true)}>Eliminar</button>
          </div>
        </div>
      </div>

      {/* Modal para cambiar imagen */}
      {abrirCambiarImagen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '400px' }}>
            <button className="close-btn" onClick={() => setAbrirCambiarImagen(false)}>✖</button>
            <h2>Cambiar Imagen</h2>
            <div style={{ marginBottom: '15px' }}>
              <label>URL de la imagen:</label>
              <input
                type="text"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={urlImagenNueva}
                onChange={(e) => setUrlImagenNueva(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '5px',
                  borderRadius: '4px',
                  border: '1px solid #ddd',
                  boxSizing: 'border-box'
                }}
              />
              <small style={{ color: '#666', display: 'block', marginTop: '5px' }}>
                La URL debe comenzar con http:// o https://
              </small>
            </div>

            {urlImagenNueva && isValidImageUrl(urlImagenNueva) && (
              <div style={{ marginBottom: '15px', textAlign: 'center' }}>
                <p>Vista previa:</p>
                <img
                  src={urlImagenNueva}
                  alt="preview"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '150px',
                    borderRadius: '4px',
                    border: '1px solid #ddd'
                  }}
                  onError={() => alert('No se pudo cargar la imagen. Verifica que la URL sea correcta y accesible.')}
                />
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button 
                onClick={() => setAbrirCambiarImagen(false)}
                style={{
                  padding: '8px 15px',
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
              <button 
                onClick={handleCambiarImagen}
                disabled={!urlImagenNueva || !isValidImageUrl(urlImagenNueva) || cargandoImagen}
                style={{
                  padding: '8px 15px',
                  backgroundColor: urlImagenNueva && isValidImageUrl(urlImagenNueva) && !cargandoImagen ? '#4CAF50' : '#ccc',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: urlImagenNueva && isValidImageUrl(urlImagenNueva) && !cargandoImagen ? 'pointer' : 'not-allowed'
                }}
              >
                {cargandoImagen ? 'Actualizando...' : 'Guardar'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Submodales independientes */}
      {abrirEditar && (
        <EditarJuegoModal 
          juego={juegoActual} 
          onClose={() => setAbrirEditar(false)}
          onJuegoActualizado={handleJuegoActualizado}
        />
      )}
      {abrirReseña && (
        <ReseñaModal 
          juego={juegoActual} 
          onClose={() => setAbrirReseña(false)}
        />
      )}
      {abrirEliminar && (
        <EliminarConfirmacionModal 
          juego={juegoActual} 
          onClose={() => setAbrirEliminar(false)}
          onJuegoEliminado={handleJuegoEliminado}
        />
      )}
      {abrirComentarios && (
        <ComentariosModal 
          juego={juegoActual} 
          onClose={() => setAbrirComentarios(false)}
        />
      )}
    </>
  );
}
