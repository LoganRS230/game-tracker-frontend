import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Principal from './components/Principal';
import FormularioJuego from './components/FormularioJuego';
import AcercaDe from './components/AcercaDe';
import MisResenas from './components/MisResenas';
import { useState } from 'react';
import './styles/App.css';

function App() {
  const usuario = 'Logan';
  const [modoOscuro, setModoOscuro] = useState(false);

  return (
    <div className={`app-container ${modoOscuro ? 'oscuro' : ''}`}>
      <Router>
        <header className="titulo-app">
          <h1>🎮 GameTracker</h1>
          <label className="switch">
            <input type="checkbox" checked={modoOscuro} onChange={() => setModoOscuro(!modoOscuro)} />
            <span className="slider"></span>
          </label>
        </header>

        <Navbar />
        <Routes>
          <Route path="/" element={<Principal usuario={usuario} modoOscuro={modoOscuro} />} />
          <Route path="/ingresar" element={<FormularioJuego modoOscuro={modoOscuro} />} />
          <Route path="/resenas" element={<MisResenas usuario={usuario} modoOscuro={modoOscuro} />} />
          <Route path="/acerca" element={<AcercaDe modoOscuro={modoOscuro} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
