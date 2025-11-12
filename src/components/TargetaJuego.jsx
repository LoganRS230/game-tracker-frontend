import '../styles/TargetaJuego.css';
import imagenPorDefecto from '../assets/pordefecto.jpg';

export default function TargetaJuego({ juego }) {
  const getGeneroClass = (genero) => {
    switch (genero) {
      case 'Acción': return 'tag accion';
      case 'Platformer': return 'tag platformer';
      case 'RPG': return 'tag rpg';
      case 'Shooter': return 'tag shooter';
      case 'Estrategia': return 'tag estrategia';
      case 'Simulación': return 'tag simulacion';
      case 'Metroidvania': return 'tag metroidvania';
      case 'Otro': return 'tag otro';
      default: return 'tag default';
    }
  };

  const isValidImageUrl = (url) => {
    if (!url || !url.trim()) return false;
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch (err) {
      return false;
    }
  };

  const imagenValida = isValidImageUrl(juego.imagenPortada) ? juego.imagenPortada : imagenPorDefecto;

  return (
    <div className="targeta-juego fade-in">
      <div className="card-inner">
        <img
          src={imagenValida}
          alt={juego.titulo}
          onError={(e) => { 
            if (e.target.src !== imagenPorDefecto) {
              e.target.src = imagenPorDefecto;
            }
          }}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
        <h3>{juego.titulo}</h3>
        <p>Desarrollador: {juego.desarrollador}</p>
        <div className={getGeneroClass(juego.genero)}>
          {juego.genero}
        </div>
        <p>Plataforma: {juego.plataforma}</p>

        <div
          className="status-indicator"
          style={{ backgroundColor: juego.completado ? 'green' : 'red' }}
        ></div>
      </div>
    </div>
  );
}
