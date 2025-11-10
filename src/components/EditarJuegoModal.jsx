import { useState } from 'react';
import '../styles/EditarJuegoModal.css';

export default function EditarJuegoModal({ juego, onClose }) {
    const [formData, setFormData] = useState({
        titulo: juego.titulo,
        desarrollador: juego.desarrollador,
        plataforma: juego.plataforma,
        genero: juego.genero,
        añoLanzamiento: juego.añoLanzamiento,
        descripcion: juego.descripcion,
        generoPersonalizado: "",
        plataformaPersonalizada: ""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleActualizar = () => {
        const generoFinal = formData.genero === "Otro" ? formData.generoPersonalizado : formData.genero;
        const plataformaFinal = formData.plataforma === "Otro" ? formData.plataformaPersonalizada : formData.plataforma;

        const juegoActualizado = {
            ...formData,
            genero: generoFinal,
            plataforma: plataformaFinal
        };

        console.log("Juego actualizado:", juegoActualizado);
        onClose();
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content editar-modal">
                <button className="close-btn" onClick={onClose}>✖</button>
                <h3>Editar juego</h3>
                <form>
                    {/* Título */}
                    <label>Título:</label>
                    <input
                        name="titulo"
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Título"
                    />

                    {/* Desarrollador */}
                    <label>Desarrollador:</label>
                    <input
                        name="desarrollador"
                        value={formData.desarrollador}
                        onChange={handleChange}
                        placeholder="Desarrollador"
                    />

                    {/* Plataforma */}
                    <label>Plataforma:</label>
                    <select name="plataforma" value={formData.plataforma} onChange={handleChange}>
                        <option value="PC">PC</option>
                        <option value="PlayStation">PlayStation</option>
                        <option value="Xbox">Xbox</option>
                        <option value="Nintendo Switch">Nintendo Switch</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {formData.plataforma === "Otro" && (
                        <input
                            name="plataformaPersonalizada"
                            value={formData.plataformaPersonalizada}
                            onChange={handleChange}
                            placeholder="Especifica la plataforma"
                        />
                    )}

                    {/* Género */}
                    <label>Género:</label>
                    <select name="genero" value={formData.genero} onChange={handleChange}>
                        <option value="Acción">Acción</option>
                        <option value="Platformer">Platformer</option>
                        <option value="RPG">RPG</option>
                        <option value="Shooter">Shooter</option>
                        <option value="Estrategia">Estrategia</option>
                        <option value="Simulación">Simulación</option>
                        <option value="Metroidvania">Metroidvania</option>
                        <option value="Otro">Otro</option>
                    </select>
                    {formData.genero === "Otro" && (
                        <input
                            name="generoPersonalizado"
                            value={formData.generoPersonalizado}
                            onChange={handleChange}
                            placeholder="Especifica el género"
                        />
                    )}

                    {/* Año de lanzamiento */}
                    <label>Año de lanzamiento:</label>
                    <input
                        name="añoLanzamiento"
                        value={formData.añoLanzamiento}
                        onChange={handleChange}
                        placeholder="Año de lanzamiento"
                    />

                    {/* Descripción */}
                    <label>Descripción:</label>
                    <textarea
                        name="descripcion"
                        value={formData.descripcion}
                        onChange={handleChange}
                        placeholder="Descripción"
                    ></textarea>
                </form>
                <div className="modal-actions">
                    <button onClick={handleActualizar}>Actualizar</button>
                    <button onClick={onClose}>Cancelar</button>
                </div>
            </div>
        </div>
    );
}
