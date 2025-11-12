import { useState } from 'react';
import { crearJuego } from '../services/api';
import '../styles/FormularioJuego.css';

export default function FormularioJuego({ onJuegoCreado }) {
  const [form, setForm] = useState({
    titulo: '',
    genero: '',
    generoOtro: '',
    plataforma: '',
    plataformaOtra: '',
    añoLanzamiento: '',
    desarrollador: '',
    imagenPortada: '',
    descripcion: '',
    completado: false
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    
    // Validar URL de imagen
    if (form.imagenPortada.trim()) {
      try {
        const url = new URL(form.imagenPortada);
        if (!['http:', 'https:'].includes(url.protocol)) {
          alert('La URL debe comenzar con http:// o https://');
          return;
        }
      } catch (err) {
        alert('URL de imagen inválida. Asegúrate de incluir http:// o https://');
        return;
      }
    }

    const generoFinal = form.genero === 'Otro' ? form.generoOtro : form.genero;
    const plataformaFinal = form.plataforma === 'Otra' ? form.plataformaOtra : form.plataforma;

    try {
      const res = await crearJuego({
        ...form,
        genero: generoFinal,
        plataforma: plataformaFinal,
        añoLanzamiento: Number(form.añoLanzamiento)
      });
      onJuegoCreado(res.data);
      setForm({
        titulo: '',
        genero: '',
        generoOtro: '',
        plataforma: '',
        plataformaOtra: '',
        añoLanzamiento: '',
        desarrollador: '',
        imagenPortada: '',
        descripcion: '',
        completado: false
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form className="formulario-juego" onSubmit={handleSubmit}>
      <input name="titulo" value={form.titulo} onChange={handleChange} placeholder="Título" required />

      <select name="genero" value={form.genero} onChange={handleChange} required>
        <option value="">Selecciona género</option>
        <option value="Acción">Acción</option>
        <option value="Platformer">Platformer</option>
        <option value="RPG">RPG</option>
        <option value="Shooter">Shooter</option>
        <option value="Estrategia">Estrategia</option>
        <option value="Simulación">Simulación</option>
        <option value="Metroidvania">Metroidvania</option>
        <option value="Otro">Otro</option>
      </select>
      {form.genero === 'Otro' && (
        <input name="generoOtro" value={form.generoOtro} onChange={handleChange} placeholder="Escribe el género" />
      )}

      <select name="plataforma" value={form.plataforma} onChange={handleChange} required>
        <option value="">Selecciona plataforma</option>
        <option value="PC">PC</option>
        <option value="PlayStation">PlayStation</option>
        <option value="Xbox">Xbox</option>
        <option value="Nintendo Switch">Nintendo Switch</option>
        <option value="Steam">Steam</option>
        <option value="Otra">Otra</option>
      </select>
      {form.plataforma === 'Otra' && (
        <input name="plataformaOtra" value={form.plataformaOtra} onChange={handleChange} placeholder="Escribe la plataforma" />
      )}

      <input name="añoLanzamiento" value={form.añoLanzamiento} onChange={handleChange} placeholder="Año" required />
      <input name="desarrollador" value={form.desarrollador} onChange={handleChange} placeholder="Desarrollador" required />
      <input
  type="url"
  name="imagenPortada"
  value={form.imagenPortada}
  onChange={handleChange}
  placeholder="URL portada (ej: https://...jpg)"
  required
/>

      <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
      <div className="toggle-completado">
  <label className="switch">
    <input
      type="checkbox"
      checked={form.completado}
      onChange={() =>
        setForm(prev => ({ ...prev, completado: !prev.completado }))
      }
    />
    <span className="slider"></span>
  </label>
  <span className={`estado ${form.completado ? "completo" : "incompleto"}`}>
    {form.completado ? "Completado" : "Incompleto"}
  </span>
</div>
      <button type="submit">Agregar juego</button>
    </form>
  );
}
