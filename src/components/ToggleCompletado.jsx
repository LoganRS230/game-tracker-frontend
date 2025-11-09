import { actualizarJuego } from '../services/api';
import '../styles/ToggleCompletado.css';

export default function ToggleCompletado({ juego }) {
  const cambiarEstado = async () => {
    try {
      await actualizarJuego(juego._id, { completado: !juego.completado });
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="slider-toggle">
      <label className="slider">
        <input
          type="checkbox"
          checked={juego.completado}
          onChange={cambiarEstado}
        />
        <span className={`slider-circle ${juego.completado ? 'verde' : 'rojo'}`}></span>
      </label>
    </div>
  );
}
