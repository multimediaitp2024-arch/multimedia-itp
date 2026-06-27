import { useEffect, useState } from "react";

export default function CultoForm({
  onSave,
  editing,
  onCancel,
}) {
  const emptyForm = {
    fecha: "",
    dia: "",
    predicador: "",
    tema: "",
    versiculos: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editing) {
      setForm(editing);
    } else {
      setForm(emptyForm);
    }
  }, [editing]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white rounded-xl shadow-lg p-5 mb-6"
    >
      <h2 className="text-xl font-bold mb-5">
        {editing ? "Editar Culto" : "Nuevo Culto"}
      </h2>

      <div className="grid md:grid-cols-2 gap-4">

        <div>
          <label className="block mb-1">Fecha</label>

          <input
            type="date"
            name="fecha"
            value={form.fecha}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Día</label>

          <select
            name="dia"
            value={form.dia}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          >
            <option value="">Seleccione</option>
            <option>Miércoles</option>
            <option>Domingo</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">
            Predicador
          </label>

          <input
            name="predicador"
            value={form.predicador}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">
            Tema
          </label>

          <input
            name="tema"
            value={form.tema}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div className="md:col-span-2">

          <label className="block mb-1">
            Versículos
          </label>

          <textarea
            rows="3"
            name="versiculos"
            value={form.versiculos}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />

        </div>

      </div>

      <div className="flex gap-3 mt-5">

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
        >
          Guardar
        </button>

        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 hover:bg-gray-600 text-white px-5 py-2 rounded"
          >
            Cancelar
          </button>
        )}

      </div>

    </form>
  );
}