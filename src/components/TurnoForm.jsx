
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function TurnoForm({
  onSave,
  editing,
  onCancel,
}) {
  const emptyForm = {
    fecha: "",
    dia: "",
    cabina: "",
    cabinaCulto: "",
    cabinaDevocional: "",
    transmision: "",
    fotos: "",
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
    const snapshot = await getDocs(collection(db, "equipo"));

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

    if (!form.fecha || !form.dia) {
      alert("Complete los datos.");
      return;
    }

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
        {editing ? "Editar Turno" : "Nuevo Turno"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 font-semibold">
            Fecha
          </label>

          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Día
          </label>

          <select
            name="dia"
            value={form.dia}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          >
            <option value="">Seleccione</option>
            <option>Miércoles</option>
            <option>Domingo</option>
          </select>
        </div>

        {form.dia === "Miércoles" && (
          <>
            <CampoPersona
              titulo="Cabina"
              nombre="cabina"
              valor={form.cabina}
              lista={equipo}
              cambio={handleChange}
            />

            <CampoPersona
              titulo="Transmisión"
              nombre="transmision"
              valor={form.transmision}
              lista={equipo}
              cambio={handleChange}
            />

            <CampoPersona
              titulo="Fotos"
              nombre="fotos"
              valor={form.fotos}
              lista={equipo}
              cambio={handleChange}
            />
          </>
        )}

        {form.dia === "Domingo" && (
          <>
            <CampoPersona
              titulo="Cabina Culto"
              nombre="cabinaCulto"
              valor={form.cabinaCulto}
              lista={equipo}
              cambio={handleChange}
            />

            <CampoPersona
              titulo="Cabina Devocional"
              nombre="cabinaDevocional"
              valor={form.cabinaDevocional}
              lista={equipo}
              cambio={handleChange}
            />

            <CampoPersona
              titulo="Transmisión"
              nombre="transmision"
              valor={form.transmision}
              lista={equipo}
              cambio={handleChange}
            />

            <CampoPersona
              titulo="Fotos"
              nombre="fotos"
              valor={form.fotos}
              lista={equipo}
              cambio={handleChange}
            />
          </>
        )}

      </div>

      <div className="flex gap-3 mt-6">

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

function CampoPersona({
  titulo,
  nombre,
  valor,
  lista,
  cambio,
}) {
  return (
    <div>
      <label className="block mb-1 font-semibold">
        {titulo}
      </label>

      <select
        name={nombre}
        value={valor}
        onChange={cambio}
        className="border rounded p-2 w-full"
      >
        <option value="">Seleccione</option>

        {lista.map((persona) => (
          <option
            key={persona.id}
            value={persona.nombre}
          >
            {persona.nombre}
          </option>
        ))}
      </select>
    </div>
  );
}