import '../styles/Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        <p>&copy; {currentYear} GameTracker. Todos los derechos reservados.</p>
        <p className="developer-credit">Desarrollado por <strong>Logan Ríos</strong></p>
      </div>
    </footer>
  );
}
