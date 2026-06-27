
import { useEffect, useState } from "react";

export default function EquipoForm({
  onSave,
  editing,
  onCancel,
}) {
  const emptyForm = {
    id: "",
    nombre: "",
    telefono: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm(emptyForm);
    }
  }, [editing]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function guardar(e) {
    e.preventDefault();

    if (
      !form.id.trim() ||
      !form.nombre.trim() ||
      !form.telefono.trim()
    ) {
      alert("Complete todos los campos.");
      return;
    }

    onSave({
      id: form.id.toLowerCase().trim(),
      nombre: form.nombre.trim(),
      telefono: form.telefono.trim(),
    });

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
        {editing ? "Editar Integrante" : "Nuevo Integrante"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-1 font-semibold">
            ID (nombre de la foto)
          </label>

          <input
            name="id"
            value={form.id}
            onChange={handleChange}
            placeholder="franklin"
            className="border rounded p-2 w-full"
            disabled={editing}
            required
          />

          <small className="text-gray-500">
            Debe coincidir con la foto.
            Ejemplo: franklin.jpg
          </small>

        </div>

        <div>
          <label className="block mb-1 font-semibold">
            Teléfono
          </label>

          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="0999999999"
            className="border rounded p-2 w-full"
            required
          />
        </div>

        <div className="md:col-span-2">

          <label className="block mb-1 font-semibold">
            Nombre
          </label>

          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Franklin Dávila"
            className="border rounded p-2 w-full"
            required
          />

        </div>

      </div>

      <div className="flex gap-3 mt-6">

        <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700">
          Guardar
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
        )}

      </div>

    </form>
  );
}