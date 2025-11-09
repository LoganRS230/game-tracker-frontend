import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Principal</Link>
      <Link to="/ingresar">Ingresar Juego</Link>
      <Link to="/resenas">Mis Reseñas</Link>
      <Link to="/acerca">Acerca de</Link>
    </nav>
  );
}
