import '../styles/ComentariosModal.css';

export default function ComentariosModal({ juego, onClose }) {
  // Aquí deberías traer los comentarios desde tu API
  const comentarios = [
    { estrellas: 5, texto: "Increíble juego!" },
    { estrellas: 3, texto: "Está bien, pero podría mejorar." }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content comentarios-modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h3>Comentarios de {juego.titulo}</h3>
        <ul>
          {comentarios.map((c, i) => (
            <li key={i}>
              {"★".repeat(c.estrellas)} - {c.texto}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
