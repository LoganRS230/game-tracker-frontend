import { useState, useEffect } from 'react';
import imagenPorDefecto from '../assets/pordefecto.jpg';
import '../styles/MisResenas.css';
import JuegoModal from './JuegoModal';
import EditarReseñaModal from './EditarReseñaModal';

export default function MisResenas({ usuario }) {
  const [resenas, setResenas] = useState([]);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);
  const [resenaEnEdicion, setResenaEnEdicion] = useState(null);
  const [cargando, setCargando] = useState(true);

  const isValidImageUrl = (url) => {
    if (!url || !url.trim()) return false;
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch (err) {
      return false;
    }
  };

  useEffect(() => {
    cargarResenas();
  }, []);

  const cargarResenas = async () => {
    try {
      setCargando(true);
      // Obtener todos los juegos primero
      const juegoResponse = await fetch('http://localhost:5000/api/juegos?page=1&limit=100&orden=mejor');
      const juegoData = await juegoResponse.json();
      
      if (juegoData.success && Array.isArray(juegoData.data)) {
        // Para cada juego, obtener sus reseñas
        const todasLasResenas = [];
        
        for (const juego of juegoData.data) {
          try {
            const resenaResponse = await fetch(`http://localhost:5000/api/resenas/juego/${juego._id}`);
            const resenaData = await resenaResponse.json();
            
            if (resenaData.success && Array.isArray(resenaData.data)) {
              // Filtrar solo las reseñas del usuario actual y agregar datos del juego
              const misResenas = resenaData.data.filter(r => r.usuario === 'LoganGRS230');
              misResenas.forEach(resena => {
                todasLasResenas.push({
                  ...resena,
                  juego: juego
                });
              });
            }
          } catch (err) {
            console.error(`Error cargando reseñas para juego ${juego._id}:`, err);
          }
        }
        
        setResenas(todasLasResenas);
        console.log('Reseñas cargadas:', todasLasResenas.length);
      } else {
        console.log('No se obtuvieron juegos correctamente');
        setResenas([]);
      }
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
      setResenas([]);
    } finally {
      setCargando(false);
    }
  };

  const verJuego = async (juegoId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/juegos/${juegoId}`);
      const data = await response.json();
      if (data.data) {
        setJuegoSeleccionado(data.data);
      }
    } catch (error) {
      console.error('Error al obtener juego:', error);
    }
  };

  const abrirEditarResena = (resena) => {
    setResenaEnEdicion(resena);
  };

  const actualizarResenaEnLista = (resenaActualizada) => {
    // Si _id es null, significa que fue eliminada
    if (!resenaActualizada._id) {
      setResenas(resenas.filter(r => r._id !== resenaActualizada._id));
    } else {
      setResenas(resenas.map(r => 
        r._id === resenaActualizada._id ? { ...r, ...resenaActualizada } : r
      ));
    }
    setResenaEnEdicion(null);
  };

  return (
    <div className="mis-resenas">
      <h2>Mis Reseñas</h2>
      {cargando && <p className="loading-message">Cargando reseñas...</p>}
      
      {!cargando && resenas.length === 0 ? (
        <p className="no-resenas">No has escrito reseñas todavía.</p>
      ) : (
        !cargando && (
          <div className="resenas-grid">
            {resenas.map(r => (
              <div key={r._id} className="resena-card">
                <div className="resena-contenedor">
                  {/* Portada del juego a la izquierda */}
                  <div className="resena-portada-container">
                    <img
                      src={r.juego?.imagenPortada && isValidImageUrl(r.juego.imagenPortada) ? r.juego.imagenPortada : imagenPorDefecto}
                      alt={r.juego?.titulo || 'Juego'}
                      className="resena-portada"
                      onError={(e) => {
                        if (e.target.src !== imagenPorDefecto) {
                          e.target.src = imagenPorDefecto;
                        }
                      }}
                    />
                  </div>

                  {/* Contenido de la reseña a la derecha */}
                  <div className="resena-contenido">
                    <h3 className="resena-titulo">
                      {r.juego?.titulo || 'Juego desconocido'}
                    </h3>
                    
                    <div className="resena-puntuacion">
                      <span className="stars">
                        {'★'.repeat(r.puntuacion)}{'☆'.repeat(5 - r.puntuacion)}
                      </span>
                      <span className="puntuacion-numero">({r.puntuacion}/5)</span>
                    </div>

                    <p className="resena-texto">{r.comentario}</p>
                    
                    <div className="resena-footer">
                      <small className="resena-fecha">
                        {new Date(r.fecha).toLocaleDateString('es-ES')}
                      </small>
                      
                      <div className="resena-acciones">
                        <button 
                          className="btn-ver-juego"
                          onClick={() => verJuego(r.juegoId)}
                          title="Ver juego completo"
                        >
                          🎮 Ver juego
                        </button>
                        
                        <button 
                          className="btn-editar-resena"
                          onClick={() => abrirEditarResena(r)}
                          title="Editar esta reseña"
                        >
                          ✏️ Editar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {juegoSeleccionado && (
        <JuegoModal
          juego={juegoSeleccionado}
          onClose={() => setJuegoSeleccionado(null)}
        />
      )}

      {resenaEnEdicion && (
        <EditarReseñaModal
          resena={resenaEnEdicion}
          onClose={() => setResenaEnEdicion(null)}
          onResenaActualizada={actualizarResenaEnLista}
        />
      )}
    </div>
  );
}
