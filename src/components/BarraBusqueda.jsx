import { useState } from 'react';
import '../styles/BarraBusqueda.css';

export default function BarraBusqueda({ onBuscar, onLimpiar }) {
  const [busqueda, setBusqueda] = useState('');
  const [modo, setModo] = useState('titulo');

  const manejarClick = () => {
    if (busqueda.trim() !== '') {
      onBuscar(modo, busqueda);
    }
  };

  const manejarEnter = (e) => {
    if (e.key === 'Enter') {
      manejarClick();
    }
  };

  const limpiarBusqueda = () => {
    setBusqueda('');
    if (onLimpiar) {
      onLimpiar(); // aquí sí resetea la lista en Principal
    }
  };

  return (
    <div className="barra-busqueda">
      <select value={modo} onChange={e => setModo(e.target.value)}>
        <option value="titulo">Título</option>
        <option value="desarrollador">Desarrollador</option>
      </select>
      <input
        type="text"
        value={busqueda}
        onChange={e => setBusqueda(e.target.value)}
        onKeyDown={manejarEnter}
        placeholder={`Buscar por ${modo}`}
      />
      <button onClick={manejarClick}>Buscar</button>
      <button className="clear-btn" onClick={limpiarBusqueda}>✖</button>
    </div>
  );
}
