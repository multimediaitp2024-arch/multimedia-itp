import { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaBookOpen, FaBible, FaTimes, FaSave } from "react-icons/fa";

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

    if (!form.fecha || !form.dia || !form.predicador || !form.tema) {
      alert("Complete todos los campos.");
      return;
    }

    onSave(form);

    if (!editing) {
      setForm(emptyForm);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">

      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {editing ? "Editar Culto" : "Nuevo Culto"}
      </h2>

      <form onSubmit={submit}>

        <div className="grid md:grid-cols-2 gap-5">

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
              <FaCalendarAlt className="text-blue-600" />
              Fecha
            </label>

            <input
              type="date"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="font-semibold flex items-center gap-2 mb-2">
              <FaCalendarAlt className="text-blue-600" />
              Día
            </label>

            <select
              name="dia"
              value={form.dia}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            >
              <option value="">Seleccione...</option>
              <option>Miércoles</option>
              <option>Domingo</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold flex items-center gap-2 mb-2">
              <FaUser className="text-green-600" />
              Predicador
            </label>

            <input
              name="predicador"
              value={form.predicador}
              onChange={handleChange}
              placeholder="Ej: Ps. Juan Pérez"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold flex items-center gap-2 mb-2">
              <FaBookOpen className="text-orange-500" />
              Tema
            </label>

            <input
              name="tema"
              value={form.tema}
              onChange={handleChange}
              placeholder="Tema del mensaje"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="font-semibold flex items-center gap-2 mb-2">
              <FaBible className="text-purple-600" />
              Versículos
            </label>

            <textarea
              rows="4"
              name="versiculos"
              value={form.versiculos}
              onChange={handleChange}
              placeholder="Ej: Juan 3:16"
              className="w-full border rounded-xl p-3 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

        </div>

        <div className="flex flex-wrap gap-3 mt-8">

          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
          >
            <FaSave />
            Guardar
          </button>

          {editing && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition"
            >
              <FaTimes />
              Cancelar
            </button>
          )}

        </div>

      </form>

    </div>
  );
}