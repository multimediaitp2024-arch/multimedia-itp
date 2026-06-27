import AdminHeader from "../components/AdminHeader";
import AdminCard from "../components/AdminCard";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { FaEdit, FaTrash } from "react-icons/fa";

import { db } from "../firebase";
import LimpiezaForm from "../components/LimpiezaForm";

export default function AdminLimpieza() {
  const [limpiezas, setLimpiezas] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    cargarLimpiezas();
  }, []);

  async function cargarLimpiezas() {
    const snapshot = await getDocs(collection(db, "Limpieza"));

    const lista = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    lista.sort((a, b) =>
      b.fechaInicio.localeCompare(a.fechaInicio)
    );

    setLimpiezas(lista);
  }

  async function guardar(form) {
    if (editing) {
      await updateDoc(
        doc(db, "Limpieza", editing.id),
        {
          fechaInicio: form.fechaInicio,
          fechaFin: form.fechaFin,
          responsable: form.responsable,
        }
      );
    } else {
      await addDoc(
        collection(db, "Limpieza"),
        form
      );
    }

    setEditing(null);
    cargarLimpiezas();
  }

  async function eliminar(id) {
    if (!window.confirm("¿Eliminar este registro?")) return;

    await deleteDoc(doc(db, "Limpieza", id));

    cargarLimpiezas();
  }

  return (
    <div className="max-w-5xl mx-auto p-5">

      <AdminHeader
  titulo="Administrar Limpieza"
  subtitulo="Organiza el cronograma de limpieza."
/>


      <LimpiezaForm
        onSave={guardar}
        editing={editing}
        onCancel={() => setEditing(null)}
      />

      {limpiezas.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-6 text-center text-gray-500">
          No existen registros.
        </div>
      ) : (
        <div className="grid gap-4">

          {limpiezas.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-xl shadow p-5"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-bold text-lg">
                    {item.responsable}
                  </h2>

                  <p>
                    <strong>Inicio:</strong>{" "}
                    {item.fechaInicio}
                  </p>

                  <p>
                    <strong>Fin:</strong>{" "}
                    {item.fechaFin}
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => setEditing(item)}
                    className="text-blue-600 text-xl"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => eliminar(item.id)}
                    className="text-red-600 text-xl"
                  >
                    <FaTrash />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}