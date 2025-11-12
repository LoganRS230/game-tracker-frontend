import "../styles/AcercaDe.css";
export default function AcercaDe() {
  return (
    <div className="acerca-de">
      <h2 className="titulo">✨ Acerca de GameTracker ✨</h2>
      <p className="intro">
        GameTracker es tu espacio para organizar y disfrutar tu biblioteca de videojuegos favoritos o simplemente para enlistar los juegos que ya haz tenido el gusto de completar.
      </p>
      <ul className="features">
        <li>📚 Añade juegos con sus detalles y portadas.</li>
        <li>📝 Escribe reseñas y guarda tu experiencia.</li>
        <li>🔍 Explora títulos por género, desarrollador o puntuación.</li>
        <li>✅ Marca juegos como completados.</li>
      </ul>
      <p className="credit">Desarrollado por <span>Logan Ríos💻</span></p>
    </div>
  );
}
