import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Principal from './components/Principal';
import FormularioJuego from './components/FormularioJuego';
import AcercaDe from './components/AcercaDe';
import MisResenas from './components/MisResenas';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const usuario = 'Logan';

  return (
    <div className="app-container">
      <Router>
        <header className="titulo-app">
          <h1>🎮 GameTracker</h1>
        </header>

        <Navbar />
        <Routes>
          <Route path="/" element={<Principal usuario={usuario} />} />
          <Route path="/ingresar" element={<FormularioJuego />} />
          <Route path="/resenas" element={<MisResenas usuario={usuario} />} />
          <Route path="/acerca" element={<AcercaDe />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
