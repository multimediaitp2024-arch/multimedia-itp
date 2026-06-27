
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function LimpiezaForm({
  onSave,
  editing,
  onCancel,
}) {
  const emptyForm = {
    fechaInicio: "",
    fechaFin: "",
    responsable: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [equipo, setEquipo] = useState([]);

  useEffect(() => {
    cargarEquipo();
  }, []);

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm(emptyForm);
    }
  }, [editing]);

  async function cargarEquipo() {
    const snapshot = await getDocs(collection(db, "Equipo"));

    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

    setEquipo(lista);
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function guardar(e) {
    e.preventDefault();
    onSave(form);

    if (!editing) {
      setForm(emptyForm);
    }
  }

  return (
    <form
      onSubmit={guardar}
      className="bg-white rounded-xl shadow p-5 mb-6"
    >
      <h2 className="text-xl font-bold mb-5">
        {editing ? "Editar Limpieza" : "Nueva Limpieza"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label>Fecha Inicio</label>

          <input
            type="date"
            name="fechaInicio"
            value={form.fechaInicio}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div>
          <label>Fecha Fin</label>

          <input
            type="date"
            name="fechaFin"
            value={form.fechaFin}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="md:col-span-2">

          <label>Responsable</label>

          <select
            name="responsable"
            value={form.responsable}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          >
            <option value="">Seleccione</option>

            {equipo.map((persona) => (
              <option
                key={persona.id}
                value={persona.nombre}
              >
                {persona.nombre}
              </option>
            ))}

          </select>

        </div>

      </div>

      <div className="flex gap-3 mt-5">

        <button className="bg-blue-600 text-white px-5 py-2 rounded">
          Guardar
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-5 py-2 rounded"
          >
            Cancelar
          </button>
        )}

      </div>

    </form>
  );
}