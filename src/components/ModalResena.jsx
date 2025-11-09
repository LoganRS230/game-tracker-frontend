import { useState } from 'react';
import { crearResena } from '../services/api';
import '../styles/ModalResena.css';

export default function ModalReseña({ juegoId, usuario, onResenaCreada }) {
  const [comentario, setComentario] = useState('');
  const [puntuacion, setPuntuacion] = useState(5);

  const enviarResena = async () => {
    try {
      const res = await crearResena({ juegoId, usuario, comentario, puntuacion });
      onResenaCreada(res.data);
      setComentario('');
      setPuntuacion(5);
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-resena">
      <textarea
        value={comentario}
        onChange={e => setComentario(e.target.value)}
        placeholder="Escribe tu reseña"
      />
      <input
        type="number"
        min="1"
        max="5"
        value={puntuacion}
        onChange={e => setPuntuacion(Number(e.target.value))}
      />
      <button onClick={enviarResena}>Enviar reseña</button>
    </div>
  );
}
