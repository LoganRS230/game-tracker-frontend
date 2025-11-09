import { useState } from 'react';
import { getJuegosPorTitulo, getJuegosPorDesarrollador } from '../services/api';
import '../styles/BarraBusqueda.css';

export default function BarraBusqueda({ onResultados }) {
  const [busqueda, setBusqueda] = useState('');
  const [modo, setModo] = useState('titulo');

  const buscar = async () => {
    try {
      const res = modo === 'titulo'
        ? await getJuegosPorTitulo(busqueda)
        : await getJuegosPorDesarrollador(busqueda);
      onResultados(res.data);
    } catch (err) {
      console.error(err.message);
      onResultados([]);
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
        placeholder={`Buscar por ${modo}`}
      />
      <button onClick={buscar}>Buscar</button>
    </div>
  );
}
