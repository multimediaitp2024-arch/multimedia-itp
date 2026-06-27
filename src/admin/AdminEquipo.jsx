import AdminHeader from "../components/AdminHeader";
import AdminCard from "../components/AdminCard";
import { useEffect, useState } from "react";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { FaEdit, FaTrash } from "react-icons/fa";

import { db } from "../firebase";
import EquipoForm from "../components/EquipoForm";

// Cargar automáticamente todas las fotos de assets/equipo
const fotos = import.meta.glob("../assets/equipo/*.jpg", {
  eager: true,
  import: "default",
});

export default function AdminEquipo() {
  const [equipo, setEquipo] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    cargarEquipo();
  }, []);

  async function cargarEquipo() {
    const snapshot = await getDocs(collection(db, "equipo"));

    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    lista.sort((a, b) => a.nombre.localeCompare(b.nombre));

    setEquipo(lista);
  }

  async function guardar(form) {
    await setDoc(
      doc(db, "equipo", form.id),
      {
        nombre: form.nombre,
        telefono: form.telefono,
      }
    );

    setEditing(null);
    cargarEquipo();
  }

  async function eliminar(id) {
    if (!window.confirm("¿Eliminar integrante?")) return;

    await deleteDoc(doc(db, "equipo", id));

    cargarEquipo();
  }

  function obtenerFoto(id) {
    return (
      fotos[`../assets/equipo/${id}.jpg`] ||
      "https://placehold.co/120x120?text=Sin+Foto"
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5">

     <AdminHeader
  titulo="Administrar Equipo"
  subtitulo="Gestiona los integrantes del ministerio."
/>

      <EquipoForm
        onSave={guardar}
        editing={editing}
        onCancel={() => setEditing(null)}
      />
      <AdminCard
    titulo={persona.nombre}
    subtitulo={persona.telefono}
    onEdit={() => setEditing(persona)}
    onDelete={() => eliminar(persona.id)}
></AdminCard>

      {equipo.length === 0 ? (

        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          No existen integrantes.
        </div>

      ) : (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

          {equipo.map((persona) => (

            <div
              key={persona.id}
              className="bg-white rounded-xl shadow p-5"
            >

              <div className="flex flex-col items-center">

                <img
                  src={obtenerFoto(persona.id)}
                  alt={persona.nombre}
                  className="w-28 h-28 rounded-full object-cover border mb-4"
                />

                <h2 className="font-bold text-lg text-center">
                  {persona.nombre}
                </h2>

                <p className="text-gray-600">
                  {persona.telefono}
                </p>

                <p className="text-xs text-gray-400 mt-1">
                  ID: {persona.id}
                </p>

              </div>

              <div className="flex justify-center gap-5 mt-5">

                <button
                  onClick={() => setEditing(persona)}
                  className="text-blue-600 hover:text-blue-800 text-xl"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => eliminar(persona.id)}
                  className="text-red-600 hover:text-red-800 text-xl"
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}