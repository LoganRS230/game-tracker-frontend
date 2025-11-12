import { useState, useEffect } from 'react';
import '../styles/HorasJugadas.css';

export default function HorasJugadas({ juego, max = 2000, compact = false, onChange }) {
  const key = juego && juego._id ? `horas_${juego._id}` : 'horas_unknown';

  const readInitial = () => {
    try {
      const raw = localStorage.getItem(key);
      return raw != null ? Number(raw) : 0;
    } catch (e) {
      return 0;
    }
  };

  const [horas, setHoras] = useState(readInitial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw != null) setHoras(Number(raw));
    } catch (e) {
      // ignore
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [juego?._id]);

  const guardar = (valor) => {
    const v = Number(valor) || 0;
    setHoras(v);
    try {
      localStorage.setItem(key, String(v));
    } catch (e) {
      // ignore storage errors
    }
    if (onChange) onChange(v);
  };

  if (compact) {
    return (
      <div className="horas-compact">
        <span className="horas-label">Horas:</span>
        <span className="horas-value">{horas}</span>
      </div>
    );
  }

  return (
    <div className="horas-jugadas">
      <input
        className="horas-range"
        type="range"
        min={0}
        max={max}
        value={horas}
        onChange={(e) => guardar(e.target.value)}
      />
      <div className="horas-controls">
        <input
          className="horas-number"
          type="number"
          min={0}
          max={max}
          value={horas}
          onChange={(e) => guardar(e.target.value)}
        />
        <span className="horas-sufijo">hrs</span>
      </div>
    </div>
  );
}
