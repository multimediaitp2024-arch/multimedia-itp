
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function AdminStreaming() {
  const [form, setForm] = useState({
    youtubeCanal: "",
    youtubeStudio: "",
    grupoWhatsapp: "",
  });

  useEffect(() => {
    cargarConfiguracion();
  }, []);

  async function cargarConfiguracion() {
    const ref = doc(db, "configuracion", "streaming");

    const snap = await getDoc(ref);

    if (snap.exists()) {
      setForm(snap.data());
    }
  }

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function guardar(e) {
    e.preventDefault();

    await setDoc(
      doc(db, "configuracion", "streaming"),
      form
    );

    alert("Configuración guardada correctamente.");
  }

  return (
    <div className="max-w-3xl mx-auto p-5">

      <h1 className="text-3xl font-bold mb-6">
        Configuración Streaming
      </h1>

      <form
        onSubmit={guardar}
        className="bg-white rounded-xl shadow p-6"
      >

        <div className="space-y-5">

          <div>

            <label className="block font-semibold mb-1">
              Canal de YouTube
            </label>

            <input
              type="url"
              name="youtubeCanal"
              value={form.youtubeCanal}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="https://youtube.com/..."
            />

          </div>

          <div>

            <label className="block font-semibold mb-1">
              YouTube Studio
            </label>

            <input
              type="url"
              name="youtubeStudio"
              value={form.youtubeStudio}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="https://studio.youtube.com/..."
            />

          </div>

          <div>

            <label className="block font-semibold mb-1">
              Grupo de WhatsApp
            </label>

            <input
              type="url"
              name="grupoWhatsapp"
              value={form.grupoWhatsapp}
              onChange={handleChange}
              className="border rounded p-2 w-full"
              placeholder="https://chat.whatsapp.com/..."
            />

          </div>

        </div>

        <button
          type="submit"
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Guardar Configuración
        </button>

      </form>

    </div>
  );
}